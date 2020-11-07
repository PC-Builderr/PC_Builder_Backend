import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BrandService } from 'src/products/additions/brand/brand.service'
import { Image } from 'src/image/image.entity'
import { Product } from './product.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { Brand } from '../additions/brand/brand.entity'
import { Options } from 'src/utils/options.interface'

@Injectable()
export class ProductService {
    private options: Options = { relations: ['images', 'brand'] }

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>
    ) {}

    async getAllProducts(): Promise<Array<Product>> {
        const products: Array<Product> = await this.productRepository.find(this.options)
        if (!products.length) throw new NotFoundException()
        return products
    }

    async getProduct(id: number, type: string): Promise<Product> {
        const options: FindOneOptions = type ? { ...this.options, where: [{ type }] } : this.options
        const product: Product = await this.productRepository.findOne(id, options)
        if (!product) throw new NotFoundException()
        return product
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const images: Array<Image> = await this.imageRepository.findByIds(createProductDto.imagesId)
        const brand = await this.brandRepository.findOne(createProductDto.brandId)
        if (!images.length || !brand) throw new BadRequestException()
        const product: Product = this.productRepository.create({
            ...createProductDto,
            brand,
            images
        })
        return this.productRepository.save(product)
    }
}
