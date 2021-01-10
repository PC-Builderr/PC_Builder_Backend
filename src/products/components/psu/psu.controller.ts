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
import { PSU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreatePSUDto } from './dto/create-psu.dto'
import { FindPSUDto } from './dto/find/find-psu.dto'
import { PSU } from './entity/psu.entity'
import { PSUResponse } from './interface/psu-response.interface'
import { PSUService } from './psu.service'

@Controller(PSU_PRODUCT)
export class PSUController {
    constructor(private readonly psuService: PSUService) {}

    @Post()
    find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findPSUDto: FindPSUDto
    ): Promise<ProductArrayResponse> {
        try {
            return this.psuService.find(findPSUDto)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<PSUResponse> {
        const psu: PSU = await this.psuService.findByProductId(id)
        return { psu }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(@Body(ValidationPipe) createPSUDto: CreatePSUDto): Promise<PSUResponse> {
        try {
            const psu: PSU = await this.psuService.create(createPSUDto)
            return { psu }
        } catch (error) {
            errorHandler(error)
        }
    }
}
