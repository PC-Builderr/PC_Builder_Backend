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
import { Product } from 'src/products/product/entity/product.entity'
import { ProductArrayResponse } from 'src/products/product/interface/product-response.interface'
import { CASE_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CaseService } from './case.service'
import { CreateCaseDto } from './dto/create-case.dto'
import { CaseFilters } from './dto/find/case-filters'
import { FindCaseDto } from './dto/find/find-case.dto'
import { Case } from './entity/case.entity'
import { CaseResponse } from './interface/case-response.interface'

@Controller(CASE_PRODUCT)
export class CaseController {
    constructor(private readonly caseService: CaseService) {}

    @Post()
    async find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findCaseDto: FindCaseDto
    ): Promise<ProductArrayResponse> {
        try {
            const products: Product[] = await this.caseService.find<CaseFilters>(findCaseDto)
            return { products }
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<CaseResponse> {
        const chassis: Case = await this.caseService.findByProductId(id)
        return { case: chassis }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(@Body(ValidationPipe) createCaseDto: CreateCaseDto): Promise<CaseResponse> {
        try {
            const chassis: Case = await this.caseService.create(createCaseDto)
            return { case: chassis }
        } catch (error) {
            errorHandler(error)
        }
    }
}
