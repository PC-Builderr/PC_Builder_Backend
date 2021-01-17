import {
    BadRequestException,
    Body,
    Controller,
    Get,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './entity/product.entity'
import { ProductArrayResponse, ProductResponse } from './interface/product-response.interface'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProducts(
        @Query('search') search: string,
        @Query('page', ParseIntPipe) page: number,
        @Query('count', ParseIntPipe) count: number
    ): Promise<ProductArrayResponse> {
        return this.productService.find({ search, page, count })
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async createProduct(
        @Body(ValidationPipe) createProductDto: CreateProductDto
    ): Promise<ProductResponse<Product>> {
        const product: Product = await this.productService.create(createProductDto)
        return { component: product }
    }
}
