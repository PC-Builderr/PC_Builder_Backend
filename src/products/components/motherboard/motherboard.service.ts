import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { MOTHERBOARD_PRODUCT } from 'src/utils/constants'
import { FindComponentService } from '../find-component.service'
import { CreateMotherboardDto } from './dto/create-motherboard.dto'
import { FindMotherboardDto } from './dto/find/find-motherboard.dto'
import { Motherboard } from './entity/motherboard.entity'
import { MotherboardRepository } from './repository/motherboard.repository'

@Injectable()
export class MotherboardService extends FindComponentService<Motherboard> {
    constructor(
        @InjectRepository(Motherboard)
        private readonly motherboardRepository: MotherboardRepository,
        private readonly productService: ProductService
    ) {
        super(motherboardRepository)
    }

    async create(createMotherboardDto: CreateMotherboardDto): Promise<Motherboard> {
        const product: Product = await this.productService.findOne(
            createMotherboardDto.productId,
            MOTHERBOARD_PRODUCT
        )

        return this.motherboardRepository.save({ ...createMotherboardDto, product })
    }
}
