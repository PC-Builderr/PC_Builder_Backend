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
import {
    ProductArrayResponse,
    ProductResponse
} from 'src/products/product/interface/product-response.interface'
import { GPU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateGPUDto } from './dto/create-gpu.dto'
import { FindGPUDto } from './dto/find/find-gpu.dto'
import { GPU } from './entity/gpu.entity'
import { GPUService } from './gpu.service'

@Controller(GPU_PRODUCT)
export class GPUController {
    constructor(private readonly gpuService: GPUService) {}

    @Post()
    find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findGPUDto: FindGPUDto
    ): Promise<ProductArrayResponse> {
        try {
            return this.gpuService.find(findGPUDto)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse<GPU>> {
        const component: GPU = await this.gpuService.findByProductId(id)
        return { component }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(@Body(ValidationPipe) createGPUDto: CreateGPUDto): Promise<ProductResponse<GPU>> {
        try {
            const component: GPU = await this.gpuService.create(createGPUDto)
            return { component }
        } catch (error) {
            errorHandler(error)
        }
    }
}
