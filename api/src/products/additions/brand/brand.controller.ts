import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'
import { Brand } from './brand.entity'
import { BrandService } from './brand.service'
import { CreateBrandDto } from './dto/create-brand.dto'
import { BrandArrayResponse, BrandResponse } from './interface/brand-response.interface'

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
    async createBrand(
        @Body(ValidationPipe) createBrandDto: CreateBrandDto
    ): Promise<BrandResponse> {
        const brand: Brand = await this.brandService.createBrand(createBrandDto)
        return { brand }
    }
}
