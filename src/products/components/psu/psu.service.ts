import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { PSU_PRODUCT } from 'src/utils/constants'
import { FindComponentService } from '../find-component.service'
import { CreatePSUDto } from './dto/create-psu.dto'
import { PSU } from './entity/psu.entity'
import { PSURepository } from './repository/psu.repository'

@Injectable()
export class PSUService extends FindComponentService<PSU> {
    constructor(
        @InjectRepository(PSU)
        private readonly psuRepository: PSURepository,
        private readonly productService: ProductService
    ) {
        super(psuRepository)
    }

    async create(createPSUDto: CreatePSUDto): Promise<PSU> {
        const product: Product = await this.productService.findOne(
            createPSUDto.productId,
            PSU_PRODUCT
        )
        return this.psuRepository.save({ ...createPSUDto, product })
    }
}
