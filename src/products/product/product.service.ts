import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Image } from 'src/image/image.entity'
import { Product } from './product.entity'
import { FindOneOptions, Like, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductRepositry } from './product.repository'
import { BrandService } from 'src/brand/brand.service'
import { Brand } from 'src/brand/brand.entity'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepositry)
        private readonly productRepository: ProductRepositry,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly brandService: BrandService
    ) {}

    async find(filters: string): Promise<Product[]> {
        const products: Product[] = await this.productRepository.findFiltered(filters ?? '')
        if (!products.length) throw new NotFoundException()
        return products
    }

    async findOne(id: number, type: string): Promise<Product> {
        const options: FindOneOptions = type
            ? { where: { type }, relations: ['images', 'brand'] }
            : {}
        const product: Product = await this.productRepository.findOne(id, options)
        if (!product) throw new NotFoundException()
        return product
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const images: Image[] = await this.imageRepository.findByIds(createProductDto.imagesId)
        if (!images.length) throw new NotFoundException()
        images.forEach(image => {
            if (image.productId) throw new BadRequestException()
        })
        const brand: Brand = await this.brandService.findById(createProductDto.brandId)
        const product: Product = this.productRepository.create({
            ...createProductDto,
            brand,
            images
        })
        return this.productRepository.save(product)
    }
}
