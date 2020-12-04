import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { GPU } from './gpu.entity'
import { GPUService } from './gpu.service'
import { GPUController } from './gpu.controller'

@Module({
    imports: [TypeOrmModule.forFeature([GPU]), ProductModule],
    providers: [GPUService],
    controllers: [GPUController]
})
export class GPUModule {}
