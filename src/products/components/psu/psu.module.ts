import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { PSUController } from './psu.controller'
import { PSURepository } from './psu.repository'
import { PSUService } from './psu.service'

@Module({
    imports: [TypeOrmModule.forFeature([PSURepository]), ProductModule],
    providers: [PSUService],
    controllers: [PSUController],
    exports: [PSUService]
})
export class PSUModule {}
