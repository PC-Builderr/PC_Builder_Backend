import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'
import { errorHandler } from 'src/utils/error-handler'
import { CPU } from './cpu.entity'
import { CPUService } from './cpu.service'
import { CreateCPUDto } from './dto/create-cpu.dto'
import { CPUArrayResponse, CPUResponse } from './interface/cpu-response.interface'

@Controller('cpu')
export class CPUController {
    constructor(private readonly cpuService: CPUService) {}

    @Get()
    async getCPU(): Promise<CPUArrayResponse> {
        const cpus: CPU[] = await this.cpuService.getCPUs()
        return { cpus }
    }

    @Get(':id')
    async getCPUById(@Param('id', ParseIntPipe) id: number): Promise<CPUResponse> {
        const cpu: CPU = await this.cpuService.getCPUById(id)
        return { cpu }
    }

    @Post()
    async createCPU(@Body(ValidationPipe) createCPUDto: CreateCPUDto): Promise<CPUResponse> {
        try {
            const cpu: CPU = await this.cpuService.createCPU(createCPUDto)
            return { cpu }
        } catch (error) {
            errorHandler(error)
        }
    }
}
