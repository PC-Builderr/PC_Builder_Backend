import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import {
    componentFindManyOptions,
    componentFindOneOptions,
    MOTHERBOARD_PRODUCT
} from 'src/utils/constants'
import { Repository } from 'typeorm'
import { CreateMotherboardDto } from './dto/create-motherboard.dto'
import { Motherboard } from './motherboard.entity'

@Injectable()
export class MotherboardService {
    constructor(
        @InjectRepository(Motherboard)
        private readonly motherboardRepository: Repository<Motherboard>,
        private readonly productService: ProductService
    ) {}

    async getMotherboards(): Promise<Motherboard[]> {
        const motherboards: Motherboard[] = await this.motherboardRepository.find(
            componentFindManyOptions
        )
        if (!motherboards.length) throw new NotFoundException()
        return motherboards
    }

    async getMotherboardByProductId(id: number): Promise<Motherboard> {
        const motherboard: Motherboard = await this.motherboardRepository.findOne(
            componentFindOneOptions(id)
        )
        if (!motherboard) throw new NotFoundException()
        return motherboard
    }

    async createMotherboard(createMotherboardDto: CreateMotherboardDto): Promise<Motherboard> {
        const product: Product = await this.productService.getProduct(
            createMotherboardDto.productId,
            MOTHERBOARD_PRODUCT
        )
        const motherboard: Motherboard = this.motherboardRepository.create({
            ...createMotherboardDto,
            product
        })
        return this.motherboardRepository.save(motherboard)
    }
}
