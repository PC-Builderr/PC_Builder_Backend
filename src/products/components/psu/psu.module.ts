import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { PSUController } from './psu.controller'
import { PSUService } from './psu.service'
import { PSURepository } from './repository/psu.repository'

@Module({
    imports: [TypeOrmModule.forFeature([PSURepository]), ProductModule],
    providers: [PSUService],
    controllers: [PSUController],
    exports: [PSUService]
})
export class PSUModule {}
