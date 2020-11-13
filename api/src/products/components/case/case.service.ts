import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { CASE_TYPE } from 'src/utils/constants'
import { Options } from 'src/utils/options.interface'
import { Repository } from 'typeorm'
import { Case } from './case.entity'
import { CreateCaseDto } from './dto/create-case.dto'

@Injectable()
export class CaseService {
    private options: Options = {
        relations: ['product', 'product.images', 'product.brand']
    }

    constructor(
        @InjectRepository(Case)
        private readonly caseRepository: Repository<Case>,
        private readonly productService: ProductService
    ) {}

    async getCases(): Promise<Case[]> {
        const cases: Case[] = await this.caseRepository.find(this.options)
        if (!cases.length) throw new NotFoundException()
        return cases
    }

    async getCaseById(id: number): Promise<Case> {
        const foundCase: Case = await this.caseRepository.findOne(id, this.options)
        if (!foundCase) throw new NotFoundException()
        return foundCase
    }

    async createCase(createCaseDto: CreateCaseDto): Promise<Case> {
        const { format, productId } = createCaseDto
        const product: Product = await this.productService.getProduct(productId, CASE_TYPE)
        const newCase: Case = this.caseRepository.create({ format, product })
        return this.caseRepository.save(newCase)
    }
}
