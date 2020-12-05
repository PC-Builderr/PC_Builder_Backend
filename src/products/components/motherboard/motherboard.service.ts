import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { MOTHERBOARD_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { Motherboard } from './motherboard.entity'
import { MotherboardRepository } from './motherboard.repository'

@Injectable()
export class MotherboardService extends ComponentService<Motherboard> {
    constructor(
        @InjectRepository(Motherboard)
        readonly motherboardRepository: MotherboardRepository,
        readonly productService: ProductService
    ) {
        super(motherboardRepository, productService, MOTHERBOARD_PRODUCT)
    }
}
