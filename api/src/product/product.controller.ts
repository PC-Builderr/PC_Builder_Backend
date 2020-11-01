import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { InsertResult } from 'typeorm'
import { Product } from './product.entity'
import { CreateProductDto } from './product.models'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getAllProducts(): Promise<Array<Product>> {
        return this.productService.getAllProducts()
    }

    @Get(':id')
    getProductByID(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.getProductByID(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(createProductDto)
    }
}
