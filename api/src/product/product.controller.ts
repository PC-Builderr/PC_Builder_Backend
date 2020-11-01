import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'
import { CreateProductDto, ProductArrayResponse, ProductResponse } from './product.models'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts(): Promise<ProductArrayResponse> {
        const products = await this.productService.getAllProducts()
        return { products }
    }

    @Get(':id')
    async getProductByID(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse> {
        const product = await this.productService.getProductByID(id)
        return { product }
    }

    @Post()
    async createProduct(
        @Body(ValidationPipe) createProductDto: CreateProductDto
    ): Promise<ProductResponse> {
        const product = await this.productService.createProduct(createProductDto)
        return { product }
    }
}
