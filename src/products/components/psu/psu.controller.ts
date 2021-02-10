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
import { PSU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreatePSUDto } from './dto/create-psu.dto'
import { FindPSUDto } from './dto/find/find-psu.dto'
import { PSU } from './entity/psu.entity'
import { PSUService } from './psu.service'

@Controller(PSU_PRODUCT)
export class PSUController {
    constructor(private readonly psuService: PSUService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    getPSUs(
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
    async getPSUByProductId(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse<PSU>> {
        const component: PSU = await this.psuService.findByProductId(id)

        return { component }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async createPSU(
        @Body(ValidationPipe) createPSUDto: CreatePSUDto
    ): Promise<ProductResponse<PSU>> {
        try {
            const component: PSU = await this.psuService.create(createPSUDto)

            return { component }
        } catch (error) {
            errorHandler(error)
        }
    }
}
