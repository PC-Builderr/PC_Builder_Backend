import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { GPU } from './gpu.entity'
import { GPU_PRODUCT } from 'src/utils/constants'
import { GPURepository } from './gpu.repository'
import { ComponentService } from '../component.service'

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
