import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { CASE_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { Case } from './entity/case.entity'
import { CaseRepository } from './repository/case.repository'

@Injectable()
export class CaseService extends ComponentService<Case> {
    constructor(
        @InjectRepository(CaseRepository)
        caseRepository: CaseRepository,
        productService: ProductService
    ) {
        super(caseRepository, productService, CASE_PRODUCT)
    }
}
