import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BrandService } from 'src/brand/brand.service'
import { Brand } from 'src/brand/entity/brand.entity'
import { Image } from 'src/image/entity/image.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './entity/product.entity'
import { ProductRepositry } from './repository/product.repository'

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
        const products: Product[] = await this.productRepository.findFiltered(filters)
        if (!products.length) throw new NotFoundException('No Products Found')
        return products
    }

    async findOne(id: number, type: string): Promise<Product> {
        const options: FindOneOptions = { where: { type }, relations: ['images', 'brand'] }
        const product: Product = await this.productRepository.findOne(id, options)
        if (!product) throw new NotFoundException('Product Not Found')
        return product
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const images: Image[] = await this.imageRepository.findByIds(createProductDto.imagesId)
        if (!images.length) throw new NotFoundException('No Images Provided')
        images.forEach(image => {
            if (image.productId) throw new BadRequestException('Image Not Available')
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
