import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { Repository } from 'typeorm'
import { GPU } from './gpu.entity'
import { GPU_PRODUCT } from 'src/utils/constants'
import { CreateGPUDto } from './dto/create-gpu.dto'
import { GPURepository } from './gpu.repository'

@Injectable()
export class GPUService {
    constructor(
        @InjectRepository(GPURepository)
        private readonly gpuRepository: GPURepository,
        private readonly productService: ProductService
    ) {}

    async getGPUs(filters: string): Promise<GPU[]> {
        const gpus: GPU[] = await this.gpuRepository.findFiltered(filters)
        if (!gpus.length) throw new NotFoundException()
        return gpus
    }

    async getGPUByProductId(id: number): Promise<GPU> {
        const GPU: GPU = await this.gpuRepository.findOne({
            where: { product: { id } }
        })
        if (!GPU) throw new NotFoundException()
        return GPU
    }

    async createGPU(createGPUDto: CreateGPUDto): Promise<GPU> {
        const product: Product = await this.productService.getProduct(
            createGPUDto.productId,
            GPU_PRODUCT
        )
        const gpu: GPU = this.gpuRepository.create({ ...createGPUDto, product })
        return this.gpuRepository.save(gpu)
    }
}
