import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { GPUController } from './gpu.controller'
import { GPUService } from './gpu.service'
import { GPURepository } from './repository/gpu.repository'

@Module({
    imports: [TypeOrmModule.forFeature([GPURepository]), ProductModule],
    providers: [GPUService],
    controllers: [GPUController],
    exports: [GPUService]
})
export class GPUModule {}
