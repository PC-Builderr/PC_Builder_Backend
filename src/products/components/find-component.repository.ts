import { ObjectLiteral, Repository } from 'typeorm'
import { ProductArrayResponse } from '../product/interface/product-response.interface'
import { ComponentFilters } from './component-filters'
import { Component } from './component.entity'
import { FindComponent } from './find-component.interface'
import { MinMaxPrice } from './min-max-price.interface'
import { Series } from './series.interface'

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

    async getMinMaxPrice<G extends ComponentFilters>(filters: G): Promise<MinMaxPrice> {
        const minMaxPrice: MinMaxPrice = await this.createQueryBuilder('component')
            .leftJoin('component.product', 'product')
            .leftJoin('product.brand', 'brand')
            .select('MAX(product.price)', 'max')
            .addSelect('MIN(product.price)', 'min')
            .where(this.generateWhereCondition(filters), filters)
            .getRawOne()
        return minMaxPrice
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

    async findSeries(): Promise<string[]> {
        const series: Series[] = await this.createQueryBuilder('component')
            .select('DISTINCT component.series')
            .getRawMany<Series>()

        return series.map((s: Series) => s?.series)
    }

    private generateWhereCondition(filterDto: ObjectLiteral = {}): string {
        return Object.keys(filterDto).reduce((whereCondition: string, key: string) => {
            const condition: string = this.createConditionForKey(key)

            return whereCondition ? `${whereCondition}  and  ${condition}` : condition
        }, '')
    }

    private createConditionForKey(key: string): string {
        if (key === 'minPrice') {
            return 'product.price >= :minPrice'
        }
        if (key === 'maxPrice') {
            return 'product.price <= :maxPrice'
        }
        if (key === 'brands') {
            return 'brand.id IN (:...brands)'
        }
        return this.createConditionForComponentKey(key)
    }

    protected createConditionForComponentKey(key: string): string {
        return `component.${key} = :${key}`
    }
}
