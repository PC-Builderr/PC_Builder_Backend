import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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
import { CompatibilityService } from './compatibility.service'
import { CreateComputerDto } from './dto/computer.dto'
import { Computer } from './entity/computer.entity'
import { ComputerParts } from './interface/computer-parts.interface'
import { ComputerRepository } from './repository/computer.repository'

@Injectable()
export class ComputerService {
    constructor(
        @InjectRepository(ComputerRepository)
        private readonly computerRepository: ComputerRepository,
        private readonly compatibilityService: CompatibilityService,
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

        this.compatibilityService.verifyCompatibility(computerParts)

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
