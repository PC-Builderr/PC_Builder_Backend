import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BrandService } from 'src/products/additions/brand/brand.service'
import { Image } from 'src/image/image.entity'
import { ImageRepository } from 'src/image/image.repository'
import { Product } from './product.entity'
import { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
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

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const images: Array<Image> = await this.imageRepository.findByIds(createProductDto.images)
        const brand = await this.brandService.getBrandByID(createProductDto.brand)
        if (!images.length) throw new BadRequestException()
        const product: Product = this.productRepository.create({
            ...createProductDto,
            brand,
            images
        })
        return this.productRepository.save(product)
    }
}
