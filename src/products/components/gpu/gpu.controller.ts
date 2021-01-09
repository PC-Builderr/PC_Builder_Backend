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
import { GPU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateGPUDto } from './dto/create-gpu.dto'
import { FindGPUDto } from './dto/find/find-gpu.dto'
import { GPU } from './entity/gpu.entity'
import { GPUService } from './gpu.service'
import { GPUResponse } from './interface/gpu-responce.interface'

@Controller(GPU_PRODUCT)
export class GPUController {
    constructor(private readonly gpuService: GPUService) {}

    @Post()
    async find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findGPUDto: FindGPUDto
    ): Promise<ProductArrayResponse> {
        try {
            const products: Product[] = await this.gpuService.find(findGPUDto)
            return { products }
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<GPUResponse> {
        const gpu: GPU = await this.gpuService.findByProductId(id)
        return { gpu }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(@Body(ValidationPipe) createGPUDto: CreateGPUDto): Promise<GPUResponse> {
        try {
            const gpu: GPU = await this.gpuService.create(createGPUDto)
            return { gpu }
        } catch (error) {
            errorHandler(error)
        }
    }
}
