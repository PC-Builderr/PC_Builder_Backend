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
import { Product } from 'src/products/product/entity/product.entity'
import {
    ProductArrayResponse,
    ProductResponse
} from 'src/products/product/interface/product-response.interface'
import { RAM_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateRAMDto } from './dto/create-ram.dto'
import { FindRAMDto } from './dto/find/find-ram.dto'
import { RAM } from './entity/ram.entity'
import { RAMService } from './ram.service'

@Controller(RAM_PRODUCT)
export class RAMController {
    constructor(private readonly ramService: RAMService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findRAMDto: FindRAMDto
    ): Promise<ProductArrayResponse> {
        try {
            return this.ramService.find(findRAMDto)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse<RAM>> {
        const component: RAM = await this.ramService.findByProductId(id)
        return { component }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(@Body(ValidationPipe) createRAMDto: CreateRAMDto): Promise<ProductResponse<RAM>> {
        try {
            const component: RAM = await this.ramService.create(createRAMDto)
            return { component }
        } catch (error) {
            errorHandler(error)
        }
    }
}
