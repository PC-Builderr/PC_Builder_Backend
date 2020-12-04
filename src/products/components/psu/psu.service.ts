import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { PSU_PRODUCT } from 'src/utils/constants'
import { Repository } from 'typeorm'
import { CreatePSUDto } from './dto/create-psu.dto'
import { PSU } from './psu.entity'

@Injectable()
export class PSUService {
    constructor(
        @InjectRepository(PSU)
        private readonly psuRepository: Repository<PSU>,
        private readonly productService: ProductService
    ) {}

    async getPSUs(): Promise<PSU[]> {
        const psus: PSU[] = await this.psuRepository.find()
        if (!psus.length) throw new NotFoundException()
        return psus
    }

    async getPSUByProductId(id: number): Promise<PSU> {
        const psu: PSU = await this.psuRepository.findOne({
            where: { product: { id } }
        })
        if (!psu) throw new NotFoundException()
        return psu
    }

    async createPSU(createPSUDto: CreatePSUDto): Promise<PSU> {
        const product: Product = await this.productService.getProduct(
            createPSUDto.productId,
            PSU_PRODUCT
        )
        const psu: PSU = this.psuRepository.create({ ...createPSUDto, product })
        return this.psuRepository.save(psu)
    }
}
