import { Controller, Get, Post } from '@nestjs/common'
import { CPUService } from './cpu.service'

@Controller('cpu')
export class CPUController {
    constructor(private readonly cpuService: CPUService) {}
    @Get()
    getCPU() {}
    @Get(':id')
    getCPUById() {}
    @Post()
    createCPU() {}
}
