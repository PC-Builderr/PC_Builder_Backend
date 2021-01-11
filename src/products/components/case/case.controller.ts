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
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import {
    ProductArrayResponse,
    ProductResponse
} from 'src/products/product/interface/product-response.interface'
import { CASE_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CaseService } from './case.service'
import { CreateCaseDto } from './dto/create-case.dto'
import { CaseFilters } from './dto/find/case-filters'
import { FindCaseDto } from './dto/find/find-case.dto'
import { Case } from './entity/case.entity'

@Controller(CASE_PRODUCT)
export class CaseController {
    constructor(private readonly caseService: CaseService) {}

    @Post()
    find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findCaseDto: FindCaseDto
    ): Promise<ProductArrayResponse> {
        try {
            return this.caseService.find<CaseFilters>(findCaseDto)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse<Case>> {
        const component: Case = await this.caseService.findByProductId(id)
        return { component }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(
        @Body(ValidationPipe) createCaseDto: CreateCaseDto
    ): Promise<ProductResponse<Case>> {
        try {
            const component: Case = await this.caseService.create(createCaseDto)
            return { component }
        } catch (error) {
            errorHandler(error)
        }
    }
}
