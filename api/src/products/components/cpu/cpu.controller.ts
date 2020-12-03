import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { AdminJwtGuard } from 'src/admin/admin.guard'
import { CPU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CPU } from './cpu.entity'
import { CPUService } from './cpu.service'
import { CreateCPUDto } from './dto/create-cpu.dto'
import { CPUArrayResponse, CPUResponse } from './interface/cpu-response.interface'

@Controller(CPU_PRODUCT)
export class CPUController {
    constructor(private readonly cpuService: CPUService) {}

    @Get()
    async getCPUs(@Query('filters') filters: string): Promise<CPUArrayResponse> {
        const cpus: CPU[] = await this.cpuService.getCPUs(filters)
        return { cpus }
    }

    @Get(':id')
    async getCPUByProductId(@Param('id', ParseIntPipe) id: number): Promise<CPUResponse> {
        const cpu: CPU = await this.cpuService.getCPUByProductId(id)
        return { cpu }
    }

    @UseGuards(AdminJwtGuard)
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
