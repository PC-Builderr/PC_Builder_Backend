import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common'
import { use } from 'passport'
import { AuthJwtGuard } from 'src/auth/guard/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interface/refresh-token-request.interface'
import { ComputerService } from './computer.service'
import { CreateComputerDto } from './dto/computer.dto'

@Controller('computer')
export class ComputerController {
    constructor(private readonly computerService: ComputerService) {}

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
