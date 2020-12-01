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
import { AdminJwtGuard } from 'src/admin/admin.guard'
import { PSU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreatePSUDto } from './dto/create-psu.dto'
import { PSUArrayResponse, PSUResponse } from './interface/psu-responce.interface'
import { PSU } from './psu.entity'
import { PSUService } from './psu.service'

@Controller(PSU_PRODUCT)
export class PSUController {
    constructor(private readonly psuService: PSUService) {}

    @Get()
    async getPSU(): Promise<PSUArrayResponse> {
        const psus: PSU[] = await this.psuService.getPSUs()
        return { psus }
    }

    @Get(':id')
    async getPSUByProductId(@Param('id', ParseIntPipe) id: number): Promise<PSUResponse> {
        const psu: PSU = await this.psuService.getPSUByProductId(id)
        return { psu }
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async createPSU(@Body(ValidationPipe) createPSUDto: CreatePSUDto): Promise<PSUResponse> {
        try {
            const psu: PSU = await this.psuService.createPSU(createPSUDto)
            return { psu }
        } catch (error) {
            errorHandler(error)
        }
    }
}
