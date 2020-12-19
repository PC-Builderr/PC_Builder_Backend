import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Case } from 'src/products/components/case/entity/case.entity'
import { CaseService } from 'src/products/components/case/case.service'
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
import { CPUService } from '../products/components/cpu/cpu.service'
import { MotherboardService } from '../products/components/motherboard/motherboard.service'
import { CreateComputerDto } from './dto/computer.dto'
import { ComputerRepository } from './repository/computer.repository'

interface ComputerParts {
    cpu: CPU
    gpu?: GPU
    motherboard: Motherboard
    case: Case
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
        console.log(createComputerDto)

        const cpu: CPU = await this.cpuService.findByProductId(createComputerDto.cpuId)
        const motherboard: Motherboard = await this.motherboardService.findByProductId(
            createComputerDto.motherboardId
        )
        const ram: RAM = await this.ramService.findByProductId(createComputerDto.ram.productId)
        const chassis: Case = await this.caseService.findByProductId(createComputerDto.caseId)
        const psu: PSU = await this.psuService.findByProductId(createComputerDto.psuId)
        const storage: Storage = await this.storageService.findByProductId(
            createComputerDto.storageId
        )

        let gpu: GPU
        if (createComputerDto.gpu) {
            gpu = await this.gpuService.findByProductId(createComputerDto.gpu.productId)
        }
        const computerParts: ComputerParts = {
            cpu,
            motherboard,
            gpu,
            ram,
            storage,
            case: chassis,
            psu
        }

        this.verifyCompatibility(computerParts)
    }

    private verifyCompatibility(computerParts: ComputerParts) {
        /* 
            computer: {
                socket
                ramType
                format
                consumption
            }
       */
    }
}
