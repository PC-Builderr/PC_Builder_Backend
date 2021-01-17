import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { ComputerService } from './computer.service'
import { CreateComputerDto } from './dto/computer.dto'

@Controller('computer')
export class ComputerController {
    constructor(private readonly computerService: ComputerService) {}

    @Post()
    async createComputer(@Body(ValidationPipe) createComputerDto: CreateComputerDto) {
        const computer = await this.computerService.create(createComputerDto)
        return { computer }
    }
}
