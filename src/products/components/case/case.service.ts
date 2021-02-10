import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { CASE_PRODUCT } from 'src/utils/constants'
import { FindComponentService } from '../find-component.service'
import { CreateCaseDto } from './dto/create-case.dto'
import { CaseFilters } from './dto/find/case-filters'
import { FindCaseDto } from './dto/find/find-case.dto'
import { Case } from './entity/case.entity'
import { CaseRepository } from './repository/case.repository'

@Injectable()
export class CaseService extends FindComponentService<Case> {
    constructor(
        @InjectRepository(Case)
        private readonly caseRepository: CaseRepository,
        private readonly productService: ProductService
    ) {
        super(caseRepository)
    }

    async create(createCaseDto: CreateCaseDto): Promise<Case> {
        const product: Product = await this.productService.findOne(
            createCaseDto.productId,
            CASE_PRODUCT
        )

        return this.caseRepository.save({ ...createCaseDto, product })
    }
}
