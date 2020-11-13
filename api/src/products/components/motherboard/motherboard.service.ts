import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { MOTHERBOARD_TYPE } from 'src/utils/constants'
import { Options } from 'src/utils/options.interface'
import { Repository } from 'typeorm'
import { CreateMotherboardDto } from './dto/create-motherboard.dto'
import { Motherboard } from './motherboard.entity'

@Injectable()
export class MotherboardService {
    private options: Options = {
        relations: ['product', 'product.images', 'product.brand']
    }

    constructor(
        @InjectRepository(Motherboard)
        private readonly motherboardRepository: Repository<Motherboard>,
        private readonly productService: ProductService
    ) {}

    async getMotherboards(): Promise<Motherboard[]> {
        const motherboards: Motherboard[] = await this.motherboardRepository.find(this.options)
        if (!motherboards.length) throw new NotFoundException()
        return motherboards
    }

    async getMotherboardById(id: number): Promise<Motherboard> {
        const motherboard: Motherboard = await this.motherboardRepository.findOne(id, this.options)
        if (!motherboard) throw new NotFoundException()
        return motherboard
    }

    async createMotherboard(createMotherboardDto: CreateMotherboardDto): Promise<Motherboard> {
        const product: Product = await this.productService.getProduct(
            createMotherboardDto.productId,
            MOTHERBOARD_TYPE
        )
        const motherboard: Motherboard = this.motherboardRepository.create({
            ...createMotherboardDto,
            product
        })
        return this.motherboardRepository.save(motherboard)
    }
}
