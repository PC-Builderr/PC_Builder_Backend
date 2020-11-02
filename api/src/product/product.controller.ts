import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'

import { Product } from './product.entity'
import { CreateProductBody, ProductArrayResponse, ProductResponse } from './product.models'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts(): Promise<ProductArrayResponse> {
        const products: Array<Product> = await this.productService.getAllProducts()
        return { products }
    }

    @Get(':id')
    async getProductByID(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse> {
        const product: Product = await this.productService.getProductByID(id)
        return { product }
    }

    @Post()
    async createProduct(
        @Body(ValidationPipe) createProductBody: CreateProductBody
    ): Promise<ProductResponse> {
        const product: Product = await this.productService.createProduct(createProductBody)
        return { product }
    }
}
