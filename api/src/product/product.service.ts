import { Injectable, NotFoundException } from '@nestjs/common'
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
        const products = await this.productRepository.find({ relations: ['images'] })
        if (!products.length) throw new NotFoundException()
        products.forEach(product => (product.price = parseFloat(product.price.toString())))
        return products
    }

    async getProductByID(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id)
        if (!product) throw new NotFoundException()
        product.price = parseFloat(product.price.toString())
        return product
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { imageIDs, name, price } = createProductDto
        const images: Array<Image> = await this.imageRepository.findByIds(imageIDs)
        const product: Product = new Product()
        product.name = name
        product.images = images
        product.price = price
        return this.productRepository.save(product)
    }
}
