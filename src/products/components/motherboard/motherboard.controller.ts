import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import {
    ProductArrayResponse,
    ProductResponse
} from 'src/products/product/interface/product-response.interface'
import { MOTHERBOARD_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateMotherboardDto } from './dto/create-motherboard.dto'
import { FindMotherboardDto } from './dto/find/find-motherboard.dto'
import { Motherboard } from './entity/motherboard.entity'
import { MotherboardService } from './motherboard.service'

@Controller(MOTHERBOARD_PRODUCT)
export class MotherboardController {
    constructor(private readonly motherboardService: MotherboardService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    getMotherboards(
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
    async getMotherboardByProductId(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProductResponse<Motherboard>> {
        const component: Motherboard = await this.motherboardService.findByProductId(id)
        return { component }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async createMotheboard(
        @Body(ValidationPipe) createMotherboardDto: CreateMotherboardDto
    ): Promise<ProductResponse<Motherboard>> {
        try {
            const component: Motherboard = await this.motherboardService.create(
                createMotherboardDto
            )
            return { component }
        } catch (error) {
            errorHandler(error)
        }
    }
}
