import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Image } from 'src/image/image.entity'
import { ImageRepository } from 'src/image/image.repository'
import { ImageService } from 'src/image/image.service'
import { InsertResult } from 'typeorm'
import { Product } from './product.entity'
import { CreateProductDto } from './product.models'
import { ProductRepository } from './product.repository'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository,
        @InjectRepository(ImageRepository)
        private readonly imageRepository: ImageRepository
    ) {}

    async getAllProducts(): Promise<Array<Product>> {
        const products: Array<Product> = await this.productRepository.find({
            relations: ['images']
        })
        if (!products.length) throw new NotFoundException()
        products.forEach(product => (product.price = parseFloat(product.price.toString())))
        return products
    }

    async getProductByID(id: number): Promise<Product> {
        const product: Product = await this.productRepository.findOne(id, {
            relations: ['images']
        })
        if (!product) throw new NotFoundException()
        product.price = parseFloat(product.price.toString())
        return product
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const images: Array<Image> = await this.imageRepository.findByIds(createProductDto.imageIDs)
        if (!images.length) throw new BadRequestException()
        return this.productRepository.createProduct(createProductDto, images)
    }
}
