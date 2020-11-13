import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'
import { MOTHERBOARD_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateMotherboardDto } from './dto/create-motherboard.dto'
import {
    MotherboardArrayResponse,
    MotherboardResponse
} from './interface/motherboard-response.interface'
import { Motherboard } from './motherboard.entity'
import { MotherboardService } from './motherboard.service'

@Controller(MOTHERBOARD_PRODUCT)
export class MotherboardController {
    constructor(private readonly motherboardService: MotherboardService) {}

    @Get()
    async getMotherboard(): Promise<MotherboardArrayResponse> {
        const motherboards: Motherboard[] = await this.motherboardService.getMotherboards()
        return { motherboards }
    }

    @Get(':id')
    async getMotherboardByProductId(
        @Param('id', ParseIntPipe) id: number
    ): Promise<MotherboardResponse> {
        const motherboard: Motherboard = await this.motherboardService.getMotherboardByProductId(id)
        return { motherboard }
    }

    @Post()
    async createMotherboard(
        @Body(ValidationPipe) createMotherboardDto: CreateMotherboardDto
    ): Promise<MotherboardResponse> {
        try {
            const motherboard: Motherboard = await this.motherboardService.createMotherboard(
                createMotherboardDto
            )
            return { motherboard }
        } catch (error) {
            errorHandler(error)
        }
    }
}
