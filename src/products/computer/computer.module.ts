import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CaseModule } from '../components/case/case.module'
import { CPUModule } from '../components/cpu/cpu.module'
import { GPUModule } from '../components/gpu/gpu.module'
import { MotherboardModule } from '../components/motherboard/motherboard.module'
import { PSUModule } from '../components/psu/psu.module'
import { RAMModule } from '../components/ram/ram.module'
import { StorageModule } from '../components/storage/storage.module'
import { ComputerController } from './computer.controller'
import { ComputerRepository } from './computer.repository'
import { ComputerService } from './computer.service'

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
