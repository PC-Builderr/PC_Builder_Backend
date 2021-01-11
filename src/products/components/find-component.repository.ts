import { ObjectLiteral, QueryBuilder, Repository } from 'typeorm'
import { Product } from '../product/entity/product.entity'
import { ProductArrayResponse } from '../product/interface/product-response.interface'
import { Component } from './component.entity'
import { FindComponent } from './find-component.interface'

export class FindComponentRepository<T extends Component> extends Repository<T> {
    protected filterFields: string[] = ['minPrice', 'maxPrice', 'brandId']

    findByProductId(id: number): Promise<T> {
        return this.createQueryBuilder('component')
            .leftJoinAndSelect('component.product', 'product')
            .leftJoinAndSelect('product.images', 'image')
            .leftJoinAndSelect('product.brand', 'brand')
            .where('product.id = :id', { id })
            .getOne()
    }

    async findFiltered<FilterType>({
        count,
        filters,
        page
    }: FindComponent<FilterType>): Promise<ProductArrayResponse> {
        const queryBuilder = this.createQueryBuilder('component')
        const [components, total] = await Promise.all([
            queryBuilder
                .leftJoinAndSelect('component.product', 'product')
                .leftJoinAndSelect('product.images', 'image')
                .leftJoinAndSelect('product.brand', 'brand')
                .where(this.generateWhereCondition(filters), filters)
                .skip((page - 1) * count)
                .take(count)
                .getMany(),
            queryBuilder.getCount()
        ])

        return { products: components.map(component => component.product), total }
    }

    private generateWhereCondition(filterDto: ObjectLiteral = {}): string {
        return Object.keys(filterDto).reduce((whereCondition: string, key: string) => {
            const condition: string = this.createConditionForKey(key)

            return whereCondition ? `${whereCondition}  and  ${condition}` : condition
        }, '')
    }

    private createConditionForKey(key: string): string {
        switch (key) {
            case 'minPrice':
                return 'product.price >= :minPrice'
            case 'maxPrice':
                return 'product.price <= :maxPrice'
            case 'brand':
                return 'brand.id IN (:...brand)'
            default:
                return this.createConditionForComponentKey(key)
        }
    }

    protected createConditionForComponentKey(key: string): string {
        return `component.${key} = :${key}`
    }
}
