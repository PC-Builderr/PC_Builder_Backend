import {
    BadRequestException,
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
import { MinMaxPrice } from '../components/min-max-price.interface'
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

    @Get('/:type')
    async getMinMaxPrice(@Param('type') type: string): Promise<MinMaxPrice> {
        console.log(type)
        return this.productService.getMinMaxPrice(type)
    }

    @Get('ids')
    async getProductsByIDs(@Query('ids') ids: string[]): Promise<{ products: Product[] }> {
        const idsArray = this.parseToNumericArray(ids)

        const products = await this.productService.findByIds(idsArray)

        return { products }
    }

    private parseToNumericArray(ids: string[] | string): number[] {
        if (typeof ids === 'string' && Number(ids)) {
            return [Number(ids)]
        }

        if (typeof ids !== 'object') {
            throw new BadRequestException()
        }

        return ids.map((id: string) => {
            if (!Number(id)) {
                throw new BadRequestException()
            }

            return Number(id)
        })
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
