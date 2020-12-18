import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { ProductResponse } from 'src/products/product/interface/product-response.interface'
import { PSU_PRODUCT } from 'src/utils/constants'
import { ComponentController } from '../component.controller'
import { CreatePSUDto } from './dto/create-psu.dto'
import { PSU } from './psu.entity'
import { PSUService } from './psu.service'

@Controller(PSU_PRODUCT)
export class PSUController extends ComponentController<PSU> {
    constructor(psuService: PSUService) {
        super(psuService)
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async create(@Body(ValidationPipe) createPSUDto: CreatePSUDto): Promise<ProductResponse<PSU>> {
        return super.createComponent<CreatePSUDto>(createPSUDto)
    }
}
