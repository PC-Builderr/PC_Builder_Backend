import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { Options } from 'src/utils/options.interface'
import { Repository } from 'typeorm'
import { GPU } from './gpu.entity'
import { GPU_TYPE } from 'src/utils/constants'
import { CreateGPUDto } from './dto/create-gpu.dto'

@Injectable()
export class GPUService {
    private options: Options = {
        relations: ['product', 'product.images', 'product.brand']
    }

    constructor(
        @InjectRepository(GPU)
        private readonly gpuRepository: Repository<GPU>,
        private readonly productService: ProductService
    ) {}

    async getGPUs(): Promise<GPU[]> {
        const gpus: GPU[] = await this.gpuRepository.find(this.options)
        if (!gpus.length) throw new NotFoundException()
        return gpus
    }

    async getGPUById(id: number): Promise<GPU> {
        const GPU: GPU = await this.gpuRepository.findOne(id, this.options)
        if (!GPU) throw new NotFoundException()
        return GPU
    }

    async createGPU(createGPUDto: CreateGPUDto): Promise<GPU> {
        const product: Product = await this.productService.getProduct(
            createGPUDto.productId,
            GPU_TYPE
        )
        const gpu: GPU = this.gpuRepository.create({ ...createGPUDto, product })
        return this.gpuRepository.save(gpu)
    }
}
