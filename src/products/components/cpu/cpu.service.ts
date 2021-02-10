import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { CPU_PRODUCT } from 'src/utils/constants'
import { FindComponentService } from '../find-component.service'
import { CreateCPUDto } from './dto/create-cpu.dto'
import { CPU } from './entity/cpu.entity'
import { CPURepository } from './repository/cpu.repository'

@Injectable()
export class CPUService extends FindComponentService<CPU> {
    constructor(
        @InjectRepository(CPU)
        private readonly cpuRepository: CPURepository,
        private readonly productService: ProductService
    ) {
        super(cpuRepository)
    }

    async create(createCPUDto: CreateCPUDto): Promise<CPU> {
        const product: Product = await this.productService.findOne(
            createCPUDto.productId,
            CPU_PRODUCT
        )

        return this.cpuRepository.save({ ...createCPUDto, product })
    }
}
