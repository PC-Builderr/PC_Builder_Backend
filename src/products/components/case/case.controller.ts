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
import {
    ProductArrayResponse,
    ProductResponse
} from 'src/products/product/interface/product-response.interface'
import { CASE_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { ComponentController } from '../component.controller'
import { Case } from './case.entity'
import { CaseService } from './case.service'
import { CreateCaseDto } from './dto/create-case.dto'

@Controller(CASE_PRODUCT)
export class CaseController extends ComponentController<Case> {
    constructor(readonly caseService: CaseService) {
        super(caseService)
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async create(
        @Body(ValidationPipe) createCaseDto: CreateCaseDto
    ): Promise<ProductResponse<Case>> {
        return super.createComponent<CreateCaseDto>(createCaseDto)
    }
}
