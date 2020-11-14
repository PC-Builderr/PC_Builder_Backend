import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/admin/admin.guard'
import { GPU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateGPUDto } from './dto/create-gpu.dto'
import { GPU } from './gpu.entity'
import { GPUService } from './gpu.service'
import { GPUArrayResponse, GPUResponse } from './interface/gpu-response.interface'

@Controller(GPU_PRODUCT)
export class GPUController {
    constructor(private readonly gpuService: GPUService) {}

    @Get()
    async getGPU(): Promise<GPUArrayResponse> {
        const gpus: GPU[] = await this.gpuService.getGPUs()
        return { gpus }
    }

    @Get(':id')
    async getGPUByProductId(@Param('id', ParseIntPipe) id: number): Promise<GPUResponse> {
        const gpu: GPU = await this.gpuService.getGPUByProductId(id)
        return { gpu }
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async createGPU(@Body(ValidationPipe) createGPUDto: CreateGPUDto): Promise<GPUResponse> {
        try {
            const gpu: GPU = await this.gpuService.createGPU(createGPUDto)
            return { gpu }
        } catch (error) {
            errorHandler(error)
        }
    }
}
