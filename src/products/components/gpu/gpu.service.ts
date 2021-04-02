import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { GPU_PRODUCT } from 'src/utils/constants'
import { SeriesResponseDto } from '../series-response.dto'
import { FindComponentService } from '../find-component.service'
import { CreateGPUDto } from './dto/create-gpu.dto'
import { GPU } from './entity/gpu.entity'
import { GPURepository } from './repository/gpu.repository'

@Injectable()
export class GPUService extends FindComponentService<GPU> {
    constructor(
        @InjectRepository(GPURepository)
        private readonly gpuRepository: GPURepository,
        private readonly productService: ProductService
    ) {
        super(gpuRepository)
    }

    async create(createGPUDto: CreateGPUDto): Promise<GPU> {
        const product: Product = await this.productService.findOne(
            createGPUDto.productId,
            GPU_PRODUCT
        )

        return this.gpuRepository.save({ ...createGPUDto, product })
    }
}
