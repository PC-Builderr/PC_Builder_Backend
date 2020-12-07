import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/admin/admin.guard'
import { ProductResponse } from 'src/products/product/interface/product-response.interface'
import { RAM_PRODUCT } from 'src/utils/constants'
import { ComponentController } from '../component.controller'
import { CreateRAMDto } from './dto/create-ram.dto'
import { RAM } from './ram.entity'
import { RAMService } from './ram.service'

@Controller(RAM_PRODUCT)
export class RAMController extends ComponentController<RAM> {
    constructor(readonly ramService: RAMService) {
        super(ramService)
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async createRAM(
        @Body(ValidationPipe) createRAMDto: CreateRAMDto
    ): Promise<ProductResponse<RAM>> {
        return super.createComponent<CreateRAMDto>(createRAMDto)
    }
}
