import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/admin/admin.guard'
import { ProductResponse } from 'src/products/product/interface/product-response.interface'
import { MOTHERBOARD_PRODUCT } from 'src/utils/constants'
import { ComponentController } from '../component.controller'
import { CreateMotherboardDto } from './dto/create-motherboard.dto'
import { Motherboard } from './motherboard.entity'
import { MotherboardService } from './motherboard.service'

@Controller(MOTHERBOARD_PRODUCT)
export class MotherboardController extends ComponentController<Motherboard> {
    constructor(readonly motherboardService: MotherboardService) {
        super(motherboardService)
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async createMotherboard(
        @Body(ValidationPipe) createMotherboardDto: CreateMotherboardDto
    ): Promise<ProductResponse<Motherboard>> {
        return super.createComponent<CreateMotherboardDto>(createMotherboardDto)
    }
}
