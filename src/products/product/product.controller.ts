import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { AuthJwtGuard } from 'src/auth/guard/auth.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductArrayResponse, ProductResponse } from './interface/product-response.interface'
import { Product } from './product.entity'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async find(@Query('filters') filters: string): Promise<ProductArrayResponse<Product>> {
        const products: Product[] = await this.productService.find(filters)
        return { products }
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse<Product>> {
        const product: Product = await this.productService.findOne(id, null)
        return { product }
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
