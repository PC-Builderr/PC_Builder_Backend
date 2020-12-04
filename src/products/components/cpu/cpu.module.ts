import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { CPUController } from './cpu.controller'
import { CPURepository } from './cpu.repository'
import { CPUService } from './cpu.service'

@Module({
    imports: [TypeOrmModule.forFeature([CPURepository]), ProductModule],
    providers: [CPUService],
    controllers: [CPUController]
})
export class CPUModule {}
