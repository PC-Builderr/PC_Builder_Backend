import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { MotherboardController } from './motherboard.controller'
import { MotherboardService } from './motherboard.service'
import { MotherboardRepository } from './repository/motherboard.repository'

@Module({
    imports: [TypeOrmModule.forFeature([MotherboardRepository]), ProductModule],
    providers: [MotherboardService],
    controllers: [MotherboardController],
    exports: [MotherboardService]
})
export class MotherboardModule {}
