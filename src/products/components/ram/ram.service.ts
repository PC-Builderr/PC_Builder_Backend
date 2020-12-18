import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { RAM_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { RAM } from './ram.entity'
import { RAMRepository } from './ram.repository'

@Injectable()
export class RAMService extends ComponentService<RAM> {
    constructor(
        @InjectRepository(RAM)
        ramRepository: RAMRepository,
        productService: ProductService
    ) {
        super(ramRepository, productService, RAM_PRODUCT)
    }
}
