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
import { CPU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CPUService } from './cpu.service'
import { CreateCPUDto } from './dto/create-cpu.dto'
import { CPUFilters } from './dto/find/cpu-filters'
import { FindCPUDto } from './dto/find/find-cpu.dto'
import { CPU } from './entity/cpu.entity'
import { CPUResponse } from './interface/cpu-responce.interface'

@Controller(CPU_PRODUCT)
export class CPUController {
    constructor(private readonly cpuService: CPUService) {}

    @Post()
    async find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findCPUDto: FindCPUDto
    ): Promise<ProductArrayResponse> {
        try {
            const products: Product[] = await this.cpuService.find<CPUFilters>(findCPUDto)
            return { products }
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<CPUResponse> {
        const cpu: CPU = await this.cpuService.findByProductId(id)
        return { cpu }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(@Body(ValidationPipe) createCPUDto: CreateCPUDto): Promise<CPUResponse> {
        try {
            const cpu: CPU = await this.cpuService.create(createCPUDto)
            return { cpu }
        } catch (error) {
            errorHandler(error)
        }
    }
}
