import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { MotherboardController } from './motherboard.controller'
import { Motherboard } from './motherboard.entity'
import { MotherboardService } from './motherboard.service'

@Module({
    imports: [TypeOrmModule.forFeature([Motherboard]), ProductModule],
    providers: [MotherboardService],
    controllers: [MotherboardController]
})
export class MotherboardModule {}
