import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/admin/admin.guard'
import { AuthJwtGuard } from 'src/auth/auth.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductArrayResponse, ProductResponse } from './interface/product-response.interface'
import { Product } from './product.entity'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts(): Promise<ProductArrayResponse> {
        const products: Product[] = await this.productService.getAllProducts()
        return { products }
    }

    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse> {
        const product: Product = await this.productService.getProduct(id, null)
        return { product }
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto): Promise<ProductResponse> {
        const product: Product = await this.productService.createProduct(createProductDto)
        return { product }
    }
}
