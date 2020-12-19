import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { BrandService } from './brand.service'
import { CreateBrandDto } from './dto/create-brand.dto'
import { Brand } from './entity/brand.entity'
import { BrandArrayResponse, BrandResponse } from './interface/brand-response.interface'

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Get()
    async find(): Promise<BrandArrayResponse> {
        const brands: Brand[] = await this.brandService.find()
        return { brands }
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<BrandResponse> {
        const brand: Brand = await this.brandService.findById(id)
        return { brand }
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async create(@Body(ValidationPipe) createBrandDto: CreateBrandDto): Promise<BrandResponse> {
        const brand: Brand = await this.brandService.create(createBrandDto)
        return { brand }
    }
}
