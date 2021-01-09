import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { Product } from 'src/products/product/entity/product.entity'
import {
    ProductArrayResponse,
    ProductResponse
} from 'src/products/product/interface/product-response.interface'
import { CPU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { ComponentController } from '../component.controller'
import { CPUService } from './cpu.service'
import { CreateCPUDto } from './dto/create-cpu.dto'
import { FilterCPUDto } from './dto/filter-cpu.dto'
import { CPU } from './entity/cpu.entity'

@Controller(CPU_PRODUCT)
export class CPUController {
    constructor(private readonly cpuService: CPUService) {}

    @Post()
    async find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        filterCPUDto: FilterCPUDto
    ) {
        try {
            const products = await this.cpuService.find(filterCPUDto)
            return { products }
        } catch (error) {
            errorHandler(error)
        }
    }
}
