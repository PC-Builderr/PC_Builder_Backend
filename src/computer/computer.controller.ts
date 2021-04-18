import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { AuthJwtGuard } from 'src/auth/guard/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interface/refresh-token-request.interface'
import { ComputerService } from './computer.service'
import { CreateComputerDto } from './dto/computer.dto'
import { ComputerResponse } from './dto/computer.response'

@Controller('computer')
export class ComputerController {
    constructor(private readonly computerService: ComputerService) {}

    @Get(':productId')
    async getComputerByProductId(
        @Param('productId', ParseIntPipe) productId: number
    ): Promise<ComputerResponse> {
        return this.computerService.findByProductId(productId)
    }

    @UseGuards(AuthJwtGuard)
    @Post()
    async createComputer(
        @Body(ValidationPipe) createComputerDto: CreateComputerDto,
        @Req() req: AuthenticatedRequest
    ) {
        const computer = await this.computerService.create(createComputerDto, req.user)

        return { computer }
    }
}
