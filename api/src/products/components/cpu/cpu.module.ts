import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { CPUController } from './cpu.controller'
import { CPU } from './cpu.entity'
import { CPUService } from './cpu.service'

@Module({
    imports: [TypeOrmModule.forFeature([CPU]), ProductModule],
    providers: [CPUService],
    controllers: [CPUController]
})
export class CPUModule {}
