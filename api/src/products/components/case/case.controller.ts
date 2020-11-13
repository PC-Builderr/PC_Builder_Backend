import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'
import { CASE_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { Case } from './case.entity'
import { CaseService } from './case.service'
import { CreateCaseDto } from './dto/create-case.dto'
import { CaseArrayResponse, CaseResponse } from './interface/case-response.interface'

@Controller(CASE_PRODUCT)
export class CaseController {
    constructor(private readonly caseService: CaseService) {}

    @Get()
    async getCase(): Promise<CaseArrayResponse> {
        const cases: Case[] = await this.caseService.getCases()
        return { cases }
    }

    @Get(':id')
    async getCaseByProductId(@Param('id', ParseIntPipe) id: number): Promise<CaseResponse> {
        const foundCase: Case = await this.caseService.getCaseByProductId(id)
        return { foundCase }
    }

    @Post()
    async createCase(@Body(ValidationPipe) createCaseDto: CreateCaseDto): Promise<CaseResponse> {
        try {
            const foundCase: Case = await this.caseService.createCase(createCaseDto)
            return { foundCase }
        } catch (error) {
            errorHandler(error)
        }
    }
}
