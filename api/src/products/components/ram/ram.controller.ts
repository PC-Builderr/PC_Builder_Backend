import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/admin/admin.guard'
import { RAM_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateRAMDto } from './dto/create-ram.dto'
import { RAMArrayResponce, RAMResponce } from './interface/ram-responce.interface'
import { RAM } from './ram.entity'
import { RAMService } from './ram.service'

@Controller(RAM_PRODUCT)
export class RAMController {
    constructor(private readonly ramService: RAMService) {}

    @Get()
    async getRAM(): Promise<RAMArrayResponce> {
        const rams: RAM[] = await this.ramService.getRAMs()
        return { rams }
    }

    @Get(':id')
    async getRAMByProductId(@Param('id', ParseIntPipe) id: number): Promise<RAMResponce> {
        const ram: RAM = await this.ramService.getRAMByProductId(id)
        return { ram }
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async createRAM(@Body(ValidationPipe) createRAMDto: CreateRAMDto): Promise<RAMResponce> {
        try {
            const ram: RAM = await this.ramService.createRAM(createRAMDto)
            return { ram }
        } catch (error) {
            errorHandler(error)
        }
    }
}
