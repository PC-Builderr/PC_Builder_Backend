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
import { CPUService } from '../products/components/cpu/cpu.service'
import { MotherboardService } from '../products/components/motherboard/motherboard.service'
import { CreateComputerDto } from './dto/computer.dto'
import { Computer } from './entity/computer.entity'
import { ComputerRepository } from './repository/computer.repository'

interface ComputerParts {
    cpu: CPU
    gpu?: GPU
    motherboard: Motherboard
    chassis: Case
    psu: PSU
    storage: Storage
    ram: RAM
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

        console.log(computer)

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
        const storage: Storage = await this.storageService.findByProductId(
            createComputerDto.storageId
        )

        const computerParts: ComputerParts = {
            cpu,
            motherboard,
            ram,
            storage,
            chassis,
            psu
        }

        if (createComputerDto.gpu) {
            computerParts.gpu = await this.gpuService.findByProductId(
                createComputerDto.gpu.productId
            )
        }

        return computerParts
    }

    private verifyCompatibility(computerParts: ComputerParts) {
        const consumption: number = this.calculateConsumption(computerParts)

        this.verifyFormatCompatibility(computerParts)
        this.verifyRamTypeCompatibility(computerParts)
        this.verifySocketCompatibility(computerParts)

        if (consumption > (computerParts.psu.power * computerParts.psu.efficiency) / 100)
            throw new BadRequestException('PSU Not Powerful Enough')
    }

    private verifySocketCompatibility({ cpu, motherboard }: ComputerParts) {
        if (cpu.socket !== motherboard.socket)
            throw new BadRequestException('Socket Not Compatible')
    }

    private verifyRamTypeCompatibility({ cpu, motherboard, ram }: ComputerParts) {
        if (ram.type !== cpu.ramType || ram.type !== motherboard.ramType)
            throw new BadRequestException('Ram Type Not Compatible')
    }

    private verifyFormatCompatibility({ chassis, motherboard, gpu }: ComputerParts) {
        if (!gpu) {
            if (motherboard.format !== chassis.format)
                throw new BadRequestException('Format Not Compatible')
            return
        }
        if (motherboard.format !== chassis.format || motherboard.format !== gpu.format)
            throw new BadRequestException('Format Not Compatible')
    }

    private calculateConsumption(computerParts: ComputerParts): number {
        let consumption: number = 0
        for (const key in computerParts) {
            if (key === 'psu') continue
            consumption += computerParts[key]
        }
        return consumption
    }

    private getProductsFromComputerParts(computerParts: ComputerParts): Product[] {
        let products: Product[] = []
        for (const key in computerParts) {
            console.log(computerParts)
            console.log(key)
            products.push(computerParts[key].product)
        }
        return products
    }
}
