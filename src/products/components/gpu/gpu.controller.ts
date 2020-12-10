import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { ProductResponse } from 'src/products/product/interface/product-response.interface'
import { GPU_PRODUCT } from 'src/utils/constants'
import { ComponentController } from '../component.controller'
import { CreateGPUDto } from './dto/create-gpu.dto'
import { GPU } from './gpu.entity'
import { GPUService } from './gpu.service'

@Controller(GPU_PRODUCT)
export class GPUController extends ComponentController<GPU> {
    constructor(readonly gpuService: GPUService) {
        super(gpuService)
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async create(@Body(ValidationPipe) createGPUDto: CreateGPUDto): Promise<ProductResponse<GPU>> {
        return super.createComponent<CreateGPUDto>(createGPUDto)
    }
}
