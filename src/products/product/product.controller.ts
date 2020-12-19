import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './entity/product.entity'
import { ProductArrayResponse, ProductResponse } from './interface/product-response.interface'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll(@Query('filters') filters: string): Promise<ProductArrayResponse> {
        const products: Product[] = await this.productService.find(filters)

        return { products }
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async create(
        @Body(ValidationPipe) createProductDto: CreateProductDto
    ): Promise<ProductResponse<Product>> {
        const product: Product = await this.productService.create(createProductDto)
        return { product }
    }
}
