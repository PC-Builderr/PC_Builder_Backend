import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { MotherboardController } from './motherboard.controller'
import { MotherboardRepository } from './motherboard.repository'
import { MotherboardService } from './motherboard.service'

@Module({
    imports: [TypeOrmModule.forFeature([MotherboardRepository]), ProductModule],
    providers: [MotherboardService],
    controllers: [MotherboardController],
    exports: [MotherboardService]
})
export class MotherboardModule {}
