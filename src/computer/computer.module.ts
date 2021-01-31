import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CaseModule } from '../products/components/case/case.module'
import { CPUModule } from '../products/components/cpu/cpu.module'
import { GPUModule } from '../products/components/gpu/gpu.module'
import { MotherboardModule } from '../products/components/motherboard/motherboard.module'
import { PSUModule } from '../products/components/psu/psu.module'
import { RAMModule } from '../products/components/ram/ram.module'
import { StorageModule } from '../products/components/storage/storage.module'
import { CompatibilityService } from './compatibility.service'
import { ComputerController } from './computer.controller'
import { ComputerService } from './computer.service'
import { ComputerStorage } from './entity/storage-quantity.entity'
import { ComputerRepository } from './repository/computer.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([ComputerRepository, ComputerStorage]),
        CaseModule,
        CPUModule,
        GPUModule,
        RAMModule,
        MotherboardModule,
        StorageModule,
        PSUModule
    ],
    providers: [ComputerService, CompatibilityService],
    controllers: [ComputerController]
})
export class ComputerModule {}
