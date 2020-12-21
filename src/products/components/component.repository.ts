import { BadRequestException } from '@nestjs/common'
import { FilterObject } from 'src/utils/interface'
import { EntityRepository, ObjectLiteral, Repository } from 'typeorm'
import { Component } from './component.entity'

@EntityRepository()
export abstract class ComponentRepository<T extends Component> extends Repository<T> {
    protected filterFields: string[] = ['minPrice', 'maxPrice', 'brandId']

    findFiltered(filters: string): Promise<T[]> {
        const { where, parameters }: FilterObject = this.generateFilterObjectFromJSONString(filters)
        return this.createQueryBuilder('component')
            .leftJoinAndSelect('component.product', 'product')
            .leftJoinAndSelect('product.images', 'image')
            .leftJoinAndSelect('product.brand', 'brand')
            .where(where, parameters)
            .getMany()
    }

    private generateFilterObjectFromJSONString(filters: string): FilterObject {
        const filterObject: FilterObject = { where: '', parameters: {} }

        if (!filters) return filterObject

        const parsedFilters: ObjectLiteral = this.parseFilters(filters)

        for (const key in parsedFilters) {
            if (!this.filterFields.includes(key)) continue

            const property: string = this.createConditionForKey(key, parsedFilters)

            if (filterObject.where) filterObject.where += ' and '
            filterObject.where += property
            filterObject.parameters[key] = parsedFilters[key]
        }
        return filterObject
    }

    private parseFilters(filters: string): ObjectLiteral {
        try {
            return JSON.parse(filters)
        } catch (error) {
            throw new BadRequestException()
        }
    }

    private createConditionForKey(key: string, parsedFilters: ObjectLiteral): string {
        switch (key) {
            case 'minPrice':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                return `product.price >= :${key}`
            case 'maxPrice':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                return `product.price <= :${key}`
            case 'brandId':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                return `brand.id = :${key}`
            default:
                return this.createConditionForComponentKey(key, parsedFilters)
        }
    }

    protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
        return `component.${key} = :${key}`
    }
}
