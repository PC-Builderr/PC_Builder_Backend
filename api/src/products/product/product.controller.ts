import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductArrayResponse, ProductResponse } from './interface/product-response.interface'
import { Product } from './product.entity'
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
        @Body(ValidationPipe) createProductDto: CreateProductDto
    ): Promise<ProductResponse> {
        const product: Product = await this.productService.createProduct(createProductDto)
        return { product }
    }
}
