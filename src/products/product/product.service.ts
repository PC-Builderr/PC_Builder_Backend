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

    async getProducts(filters: string): Promise<Product[]> {
        const products: Product[] = await this.productRepository.getFilteredProducts(filters ?? '')
        if (!products.length) throw new NotFoundException()
        return products
    }

    async getProduct(id: number, type: string): Promise<Product> {
        const options: FindOneOptions = type ? { where: { type } } : {}
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
