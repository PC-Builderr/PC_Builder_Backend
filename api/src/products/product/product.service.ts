import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BrandService } from 'src/brand/brand.service'
import { Image } from 'src/image/image.entity'
import { Product } from './product.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { Brand } from 'src/brand/brand.entity'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly brandService: BrandService
    ) {}

    async getAllProducts(): Promise<Product[]> {
        const products: Product[] = await this.productRepository.find()
        if (!products.length) throw new NotFoundException()
        return products
    }

    async getProduct(id: number, type: string): Promise<Product> {
        const options: FindOneOptions = type ? { where: [{ type }] } : {}
        const product: Product = await this.productRepository.findOne(id, options)
        if (!product) throw new NotFoundException()
        return product
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const images: Image[] = await this.imageRepository.findByIds(createProductDto.imagesId)
        if (!images.length) throw new BadRequestException()
        const brand: Brand = await this.brandService.getBrandByID(createProductDto.brandId)
        const product: Product = this.productRepository.create({
            ...createProductDto,
            brand,
            images
        })
        return this.productRepository.save(product)
    }
}