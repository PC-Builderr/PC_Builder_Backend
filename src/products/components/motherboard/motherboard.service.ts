import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { MOTHERBOARD_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { Motherboard } from './entity/motherboard.entity'
import { MotherboardRepository } from './repository/motherboard.repository'

@Injectable()
export class MotherboardService extends ComponentService<Motherboard> {
    constructor(
        @InjectRepository(Motherboard)
        motherboardRepository: MotherboardRepository,
        productService: ProductService
    ) {
        super(motherboardRepository, productService, MOTHERBOARD_PRODUCT)
    }
}
