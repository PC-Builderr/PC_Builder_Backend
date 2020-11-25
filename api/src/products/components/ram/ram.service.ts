import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { RAM_PRODUCT } from 'src/utils/constants'
import { Repository } from 'typeorm'
import { CreateRAMDto } from './dto/create-ram.dto'
import { RAM } from './ram.entity'

@Injectable()
export class RAMService {
    constructor(
        @InjectRepository(RAM)
        private readonly ramRepository: Repository<RAM>,
        private readonly productService: ProductService
    ) {}

    async getRAMs(): Promise<RAM[]> {
        const rams: RAM[] = await this.ramRepository.find()
        if (!rams.length) throw new NotFoundException()
        return rams
    }

    async getRAMByProductId(id: number): Promise<RAM> {
        const ram: RAM = await this.ramRepository.findOne({
            where: { product: { id } }
        })
        if (!ram) throw new NotFoundException()
        return ram
    }

    async createRAM(createRAMDto: CreateRAMDto): Promise<RAM> {
        const product: Product = await this.productService.getProduct(createRAMDto.productId, RAM_PRODUCT)
        const ram: RAM = this.ramRepository.create({ ...createRAMDto, product })
        return this.ramRepository.save(ram)
    }
}
