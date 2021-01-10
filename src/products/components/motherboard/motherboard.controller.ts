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
import { MOTHERBOARD_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateMotherboardDto } from './dto/create-motherboard.dto'
import { FindMotherboardDto } from './dto/find/find-motherboard.dto'
import { Motherboard } from './entity/motherboard.entity'
import { MotherboardResponse } from './interface/motherboard-response.interface'
import { MotherboardService } from './motherboard.service'

@Controller(MOTHERBOARD_PRODUCT)
export class MotherboardController {
    constructor(private readonly motherboardService: MotherboardService) {}

    @Post()
    find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findMotherboardDto: FindMotherboardDto
    ): Promise<ProductArrayResponse> {
        try {
            return this.motherboardService.find(findMotherboardDto)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<MotherboardResponse> {
        const motherboard: Motherboard = await this.motherboardService.findByProductId(id)
        return { motherboard }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(
        @Body(ValidationPipe) createMotherboardDto: CreateMotherboardDto
    ): Promise<MotherboardResponse> {
        try {
            const motherboard: Motherboard = await this.motherboardService.create(
                createMotherboardDto
            )
            return { motherboard }
        } catch (error) {
            errorHandler(error)
        }
    }
}
