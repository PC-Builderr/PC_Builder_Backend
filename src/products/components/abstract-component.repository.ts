import { BadRequestException } from '@nestjs/common'
import { FilterObject } from 'src/utils/interface'
import { EntityRepository, ObjectLiteral, Repository } from 'typeorm'

@EntityRepository()
export abstract class ComponentRepository<Component> extends Repository<Component> {
    private productFilterFields: string[] = ['minPrice', 'maxPrice', 'brandId']

    protected abstract filterFields: string[]

    findFiltered(filters: string): Promise<Component[]> {
        const { where, parameters }: FilterObject = this.generateFilterObjectFromJSONString(filters)
        return this.createQueryBuilder('component')
            .leftJoinAndSelect('component.product', 'product')
            .leftJoinAndSelect('product.images', 'image')
            .leftJoinAndSelect('product.brand', 'brand')
            .where(where, parameters)
            .getMany()
    }

    private generateFilterObjectFromJSONString(filters: string): FilterObject {
        const filterFields = { ...this.filterFields, ...this.productFilterFields }
        const filterObject: FilterObject = { where: '', parameters: {} }

        if (!filters) return filterObject

        const parsedFilters: ObjectLiteral = this.parseFilters(filters)

        for (const key in parsedFilters) {
            if (!filterFields.includes(key)) continue

            const property: string = this.createConditionForKey(key, parsedFilters)

            if (filterObject.where) filterObject.where += ' and '
            filterObject.where += property
            filterObject.parameters[key] = parsedFilters[key]
        }
        return filterObject
    }

    protected parseFilters(filters: string): ObjectLiteral {
        try {
            return JSON.parse(filters)
        } catch (error) {
            throw new BadRequestException()
        }
    }

    private createConditionForKey(key: string, parsedFilters: ObjectLiteral) {
        return (
            this.createConditionForProductKey(key, parsedFilters) ??
            this.createConditionForComponentKey(key, parsedFilters) ??
            this.createDefultCondition(key)
        )
    }

    private createConditionForProductKey(key: string, parsedFilters: ObjectLiteral): string | null {
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
                return null
        }
    }

    protected abstract createConditionForComponentKey(
        key: string,
        parsedFilters: ObjectLiteral
    ): string | null

    private createDefultCondition(key: string): string {
        return `component.${key} = :${key}`
    }
}
