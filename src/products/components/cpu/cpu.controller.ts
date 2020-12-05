import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/admin/admin.guard'
import { ProductResponse } from 'src/products/product/interface/product-response.interface'
import { CPU_PRODUCT } from 'src/utils/constants'
import { ComponentController } from '../component.controller'
import { CPU } from './cpu.entity'
import { CPUService } from './cpu.service'
import { CreateCPUDto } from './dto/create-cpu.dto'

@Controller(CPU_PRODUCT)
export class CPUController extends ComponentController<CPU> {
    constructor(readonly cpuService: CPUService) {
        super(cpuService)
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async create(@Body(ValidationPipe) createCPUDto: CreateCPUDto): Promise<ProductResponse<CPU>> {
        return super.createComponent<CreateCPUDto>(createCPUDto)
    }
}
