import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'
import { errorHandler } from 'src/utils/error-handler'
import { Case } from './case.entity'
import { CaseService } from './case.service'
import { CreateCaseDto } from './dto/create-case.dto'
import { CaseArrayResponse, CaseResponse } from './interface/case-response.interface'

@Controller('case')
export class CaseController {
    constructor(private readonly caseService: CaseService) {}

    @Get()
    async getCPU(): Promise<CaseArrayResponse> {
        const cases: Array<Case> = await this.caseService.getCases()
        return { cases }
    }

    @Get(':id')
    async getCPUById(@Param('id', ParseIntPipe) id: number): Promise<CaseResponse> {
        const foundCase: Case = await this.caseService.getCaseById(id)
        return { foundCase }
    }

    @Post()
    async createCPU(@Body(ValidationPipe) createCaseDto: CreateCaseDto): Promise<CaseResponse> {
        try {
            const foundCase: Case = await this.caseService.createCase(createCaseDto)
            return { foundCase }
        } catch (error) {
            errorHandler(error)
        }
    }
}
