import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'
import { errorHandler } from 'src/utils/error-handler'
import { CreateGPUDto } from './dto/create-gpu.dto'
import { GPU } from './gpu.entity'
import { GPUService } from './gpu.service'
import { GPUArrayResponse, GPUResponse } from './interface/gpu-response.interface'

@Controller('gpu')
export class GPUController {
    constructor(private readonly gpuService: GPUService) {}

    @Get()
    async getCPU(): Promise<GPUArrayResponse> {
        const gpus: GPU[] = await this.gpuService.getGPUs()
        return { gpus }
    }

    @Get(':id')
    async getCPUById(@Param('id', ParseIntPipe) id: number): Promise<GPUResponse> {
        const gpu: GPU = await this.gpuService.getGPUById(id)
        return { gpu }
    }

    @Post()
    async createCPU(@Body(ValidationPipe) createGPUDto: CreateGPUDto): Promise<GPUResponse> {
        try {
            const gpu: GPU = await this.gpuService.createGPU(createGPUDto)
            return { gpu }
        } catch (error) {
            errorHandler(error)
        }
    }
}
