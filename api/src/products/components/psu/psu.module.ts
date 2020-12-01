import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { PSUController } from './psu.controller'
import { PSU } from './psu.entity'
import { PSUService } from './psu.service'

@Module({
    imports: [TypeOrmModule.forFeature([PSU]), ProductModule],
    providers: [PSUService],
    controllers: [PSUController]
})
export class PSUModule {}
