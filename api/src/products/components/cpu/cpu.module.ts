import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CPUController } from './cpu.controller'
import { CPURepository } from './cpu.repository'
import { CPUService } from './cpu.service'

@Module({
    imports: [TypeOrmModule.forFeature([CPURepository])],
    providers: [CPUService],
    controllers: [CPUController]
})
export class CPUModule {}
