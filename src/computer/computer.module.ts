import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CaseModule } from '../products/components/case/case.module'
import { CPUModule } from '../products/components/cpu/cpu.module'
import { GPUModule } from '../products/components/gpu/gpu.module'
import { MotherboardModule } from '../products/components/motherboard/motherboard.module'
import { PSUModule } from '../products/components/psu/psu.module'
import { RAMModule } from '../products/components/ram/ram.module'
import { StorageModule } from '../products/components/storage/storage.module'
import { ComputerController } from './computer.controller'
import { ComputerService } from './computer.service'
import { ComputerRepository } from './repository/computer.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([ComputerRepository]),
        CaseModule,
        CPUModule,
        GPUModule,
        RAMModule,
        MotherboardModule,
        StorageModule,
        PSUModule
    ],
    providers: [ComputerService],
    controllers: [ComputerController]
})
export class ComputerModule {}