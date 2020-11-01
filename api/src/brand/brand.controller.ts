import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    ValidationPipe
} from '@nestjs/common'
import { Brand } from './brand.entity'
import { BrandArrayResponse, BrandResponse, CreateBrandDto } from './brand.model'
import { BrandService } from './brand.service'

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Get()
    async getAllBrands(): Promise<BrandArrayResponse> {
        const brands: Array<Brand> = await this.brandService.getAllBrands()
        return { brands }
    }

    @Get(':id')
    async getBrandByID(@Param('id', ParseIntPipe) id: number): Promise<BrandResponse> {
        const brand: Brand = await this.brandService.getBrandByID(id)
        return { brand }
    }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    createBrand(@Body(ValidationPipe) createBrandDto: CreateBrandDto): Promise<void> {
        return this.brandService.createBrand(createBrandDto)
    }
}
