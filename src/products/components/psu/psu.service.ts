import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { PSU_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { PSU } from './psu.entity'
import { PSURepository } from './psu.repository'

@Injectable()
export class PSUService extends ComponentService<PSU> {
    constructor(
        @InjectRepository(PSU)
        readonly psuRepository: PSURepository,
        readonly productService: ProductService
    ) {
        super(psuRepository, productService, PSU_PRODUCT)
    }
}
