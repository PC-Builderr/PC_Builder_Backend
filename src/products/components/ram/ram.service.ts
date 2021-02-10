import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { RAM_PRODUCT } from 'src/utils/constants'
import { FindComponentService } from '../find-component.service'
import { CreateRAMDto } from './dto/create-ram.dto'
import { RAM } from './entity/ram.entity'
import { RAMRepository } from './repository/ram.repository'

@Injectable()
export class RAMService extends FindComponentService<RAM> {
    constructor(
        @InjectRepository(RAM)
        private readonly ramRepository: RAMRepository,
        private readonly productService: ProductService
    ) {
        super(ramRepository)
    }

    async create(createRAMDto: CreateRAMDto): Promise<RAM> {
        const product: Product = await this.productService.findOne(
            createRAMDto.productId,
            RAM_PRODUCT
        )

        return this.ramRepository.save({ ...createRAMDto, product })
    }
}
