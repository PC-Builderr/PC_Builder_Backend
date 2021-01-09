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
import { Product } from 'src/products/product/entity/product.entity'
import { ProductArrayResponse } from 'src/products/product/interface/product-response.interface'
import { RAM_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateRAMDto } from './dto/create-ram.dto'
import { FindRAMDto } from './dto/find/find-ram.dto'
import { RAM } from './entity/ram.entity'
import { RAMResponse } from './interface/ram-response.interface'
import { RAMService } from './ram.service'

@Controller(RAM_PRODUCT)
export class RAMController {
    constructor(private readonly ramService: RAMService) {}

    @Post()
    async find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findRAMDto: FindRAMDto
    ): Promise<ProductArrayResponse> {
        try {
            const products: Product[] = await this.ramService.find(findRAMDto)
            return { products }
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<RAMResponse> {
        const ram: RAM = await this.ramService.findByProductId(id)
        return { ram }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(@Body(ValidationPipe) createRAMDto: CreateRAMDto): Promise<RAMResponse> {
        try {
            const ram: RAM = await this.ramService.create(createRAMDto)
            return { ram }
        } catch (error) {
            errorHandler(error)
        }
    }
}
