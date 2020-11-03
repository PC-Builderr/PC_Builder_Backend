import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BrandService } from 'src/products/additions/brand/brand.service'
import { Image } from 'src/image/image.entity'
import { ImageRepository } from 'src/image/image.repository'
import { Product } from './product.entity'
import { CreateProductBody, CreateProductDto } from './product.models'
import { ProductRepository } from './product.repository'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository,
        @InjectRepository(ImageRepository)
        private readonly imageRepository: ImageRepository,
        private readonly brandService: BrandService
    ) {}

    async getAllProducts(): Promise<Array<Product>> {
        const products: Array<Product> = await this.productRepository.find({
            relations: ['images', 'brand']
        })
        if (!products.length) throw new NotFoundException()
        return products
    }

    async getProductByID(id: number): Promise<Product> {
        const product: Product = await this.productRepository.findOne(id, {
            relations: ['images', 'brand']
        })
        if (!product) throw new NotFoundException()
        return product
    }

    async createProduct(createProductBody: CreateProductBody): Promise<Product> {
        const images: Array<Image> = await this.imageRepository.findByIds(createProductBody.images)
        const brand = await this.brandService.getBrandByID(createProductBody.brand)
        if (!images.length) throw new BadRequestException()
        const createProductDto: CreateProductDto = { ...createProductBody, brand, images }
        return this.productRepository.createProduct(createProductDto)
    }
}
