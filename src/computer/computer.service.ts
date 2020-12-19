import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { stringify } from 'querystring'
import { CaseService } from 'src/products/components/case/case.service'
import { Case } from 'src/products/components/case/entity/case.entity'
import { CPU } from 'src/products/components/cpu/entity/cpu.entity'
import { GPU } from 'src/products/components/gpu/entity/gpu.entity'
import { GPUService } from 'src/products/components/gpu/gpu.service'
import { Motherboard } from 'src/products/components/motherboard/entity/motherboard.entity'
import { PSU } from 'src/products/components/psu/entity/psu.entity'
import { PSUService } from 'src/products/components/psu/psu.service'
import { RAM } from 'src/products/components/ram/entity/ram.entity'
import { RAMService } from 'src/products/components/ram/ram.service'
import { Storage } from 'src/products/components/storage/entity/storage.entity'
import { StorageService } from 'src/products/components/storage/storage.service'
import { Product } from 'src/products/product/entity/product.entity'
import { FORMAT_TYPES } from 'src/utils/constants'
import { CPUService } from '../products/components/cpu/cpu.service'
import { MotherboardService } from '../products/components/motherboard/motherboard.service'
import { CreateComputerDto } from './dto/computer.dto'
import { Computer } from './entity/computer.entity'
import { ComputerRepository } from './repository/computer.repository'

interface Component<T> {
    product: T
    quantity: number
}

interface ComputerParts {
    cpu: CPU
    gpu?: Component<GPU>
    motherboard: Motherboard
    chassis: Case
    psu: PSU
    storages: Storage[]
    ram: Component<RAM>
}

@Injectable()
export class ComputerService {
    constructor(
        @InjectRepository(ComputerRepository)
        private readonly computerRepository: ComputerRepository,
        private readonly cpuService: CPUService,
        private readonly motherboardService: MotherboardService,
        private readonly ramService: RAMService,
        private readonly caseService: CaseService,
        private readonly psuService: PSUService,
        private readonly gpuService: GPUService,
        private readonly storageService: StorageService
    ) {}

    async create(createComputerDto: CreateComputerDto) {
        const computerParts: ComputerParts = await this.createComputerParts(createComputerDto)

        this.verifyCompatibility(computerParts)

        const components: Product[] = this.getProductsFromComputerParts(computerParts)

        const computer: Computer = this.computerRepository.create({ components })

        return computer
    }

    private async createComputerParts(
        createComputerDto: CreateComputerDto
    ): Promise<ComputerParts> {
        const cpu: CPU = await this.cpuService.findByProductId(createComputerDto.cpuId)
        const ram: RAM = await this.ramService.findByProductId(createComputerDto.ram.productId)
        const chassis: Case = await this.caseService.findByProductId(createComputerDto.caseId)
        const psu: PSU = await this.psuService.findByProductId(createComputerDto.psuId)
        const motherboard: Motherboard = await this.motherboardService.findByProductId(
            createComputerDto.motherboardId
        )

        const storages: Storage[] = await Promise.all(
            createComputerDto.storageIds.map((id: number) =>
                this.storageService.findByProductId(id)
            )
        )

        const computerParts: ComputerParts = {
            cpu,
            motherboard,
            ram: {
                product: ram,
                quantity: createComputerDto.ram.quantity
            },
            storages,
            chassis,
            psu
        }

        if (createComputerDto.gpu) {
            const gpu: GPU = await this.gpuService.findByProductId(createComputerDto.gpu.productId)
            computerParts.gpu = {
                product: gpu,
                quantity: createComputerDto.gpu.quantity
            }
        }

        return computerParts
    }

    private verifyCompatibility(computerParts: ComputerParts) {
        const consumption: number = this.calculateConsumption(computerParts)

        this.verifyNoDedicatedGPUCompatibility(computerParts)
        this.verifyFormatCompatibility(computerParts)
        this.verifyRamTypeCompatibility(computerParts)
        this.verifySocketCompatibility(computerParts)
        this.verifyStorageCompatibility(computerParts)

        if (consumption > (computerParts.psu.power * computerParts.psu.efficiency) / 100)
            throw new BadRequestException('PSU Not Powerful Enough')
    }

    private calculateConsumption(computerParts: ComputerParts): number {
        const consumption: number = Object.keys(computerParts).reduce(
            (consumption: number, key: string): number => {
                if (key === 'psu' || key === 'chassis') return
                if (key === 'storages') {
                    return consumption + this.calculateStoragesConsumption(computerParts.storages)
                }
                if (key === 'ram' || key === 'gpu') {
                    return (
                        consumption +
                        computerParts[key].product.consumption * computerParts[key].quantity
                    )
                }
                return consumption + computerParts[key].consumption
            },
            0
        )
        return consumption
    }

    private calculateStoragesConsumption(storages: Storage[]): number {
        return storages.reduce(
            (consumption: number, storage: Storage): number => consumption + storage.consumption,
            0
        )
    }

    private verifyNoDedicatedGPUCompatibility({ gpu, cpu }: ComputerParts) {
        if (!cpu.integratedGraphics || !gpu)
            throw new BadRequestException('No Integrated Or Dedicated Graphics')
    }

    private verifySocketCompatibility({ cpu, motherboard }: ComputerParts) {
        if (cpu.socket !== motherboard.socket)
            throw new BadRequestException('Socket Not Compatible')
    }

    private verifyRamTypeCompatibility({ cpu, motherboard, ram }: ComputerParts) {
        if (ram.product.type !== cpu.ramType || ram.product.type !== motherboard.ramType)
            throw new BadRequestException('Ram Type Not Compatible')
    }

    private verifyFormatCompatibility({ chassis, motherboard, gpu }: ComputerParts) {
        let maxFormatValue = FORMAT_TYPES.get(chassis.format)

        if (FORMAT_TYPES.get(motherboard.format) > maxFormatValue)
            throw new BadRequestException('Format Not Compatible')

        if (gpu && FORMAT_TYPES.get(gpu.product.format) > maxFormatValue)
            throw new BadRequestException('Format Not Compatible')
    }

    private verifyStorageCompatibility({ storages, motherboard }: ComputerParts) {
        const storageQuantities: Map<string, number> = new Map()
        storages.forEach((storage: Storage) => {
            if (!storageQuantities.has(storage.type)) {
                storageQuantities.set(storage.type, 1)
                return
            }
            storageQuantities.set(storage.type, storageQuantities.get(storage.type) + 1)
        })

        if (motherboard.m2Ports < storageQuantities.get('М.2 NVMe'))
            throw new BadRequestException('Not Enough M.2 NVMe Slots')

        if (motherboard.sataPorts < storageQuantities.get('SATA'))
            throw new BadRequestException('Not Enough SATA Prots')
    }

    private getProductsFromComputerParts(computerParts: ComputerParts): Product[] {
        const products: Product[] = []
        Object.keys(computerParts).forEach((key: string) => {
            if (key === 'storages') {
                computerParts.storages.forEach(storage => products.push(storage.product))
                return
            }
            if (key === 'gpu' || key === 'ram') {
                products.push(computerParts[key].product.product)
                return
            }
            products.push(computerParts[key].product)
        })
        return products
    }
}
