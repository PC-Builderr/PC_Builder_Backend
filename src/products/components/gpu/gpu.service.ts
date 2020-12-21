import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { GPU_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { GPU } from './entity/gpu.entity'
import { GPURepository } from './repository/gpu.repository'

@Injectable()
export class GPUService extends ComponentService<GPU> {
    constructor(
        @InjectRepository(GPURepository)
        gpuRepository: GPURepository,
        productService: ProductService
    ) {
        super(gpuRepository, productService, GPU_PRODUCT)
    }
}
