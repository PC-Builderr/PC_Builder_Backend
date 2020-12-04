import { BadRequestException } from '@nestjs/common'
import { FilterObject } from 'src/utils/interface'
import { EntityRepository, Repository } from 'typeorm'
import { Case } from './case.entity'
import { CaseFilters } from './interface/case-filters.interface'

const CASE_FILTER_FIELDS: string[] = ['minPrice', 'maxPrice', 'brandId', 'format']

@EntityRepository(Case)
export class CaseRepository extends Repository<Case> {
    getCases(filters: string): Promise<Case[]> {
        const { condition, values }: FilterObject = this.generateFilterObjectFromJSONString(filters)
        return this.createQueryBuilder('case')
            .leftJoinAndSelect('case.product', 'product')
            .leftJoinAndSelect('product.images', 'image')
            .leftJoinAndSelect('product.brand', 'brand')
            .where(condition, values)
            .getMany()
    }

    private generateFilterObjectFromJSONString(filters: string): FilterObject {
        const filterObject: FilterObject = { condition: '', values: {} }
        if (!filters) return filterObject

        const parsedFilters: CaseFilters = this.parseFilters(filters)

        for (const key in parsedFilters) {
            if (!CASE_FILTER_FIELDS.includes(key)) continue

            let property: string = `case.${key} = :${key}`
            switch (key) {
                case 'minPrice':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    property = `product.price >= :${key}`
                    break
                case 'maxPrice':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    property = `product.price <= :${key}`
                    break
                case 'brandId':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    property = `brand.id = :${key}`
                    break
            }
            if (filterObject.condition) filterObject.condition += ' and '
            filterObject.condition += property
            filterObject.values[key] = parsedFilters[key]
        }
        return filterObject
    }

    private parseFilters(filters: string): CaseFilters {
        try {
            return JSON.parse(filters)
        } catch (error) {
            throw new BadRequestException()
        }
    }
}
