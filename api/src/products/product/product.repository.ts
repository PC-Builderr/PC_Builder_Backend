import { FilterObject } from 'src/utils/interface'
import { EntityRepository, Repository } from 'typeorm'
import { Product } from './product.entity'

@EntityRepository(Product)
export class ProductRepositry extends Repository<Product> {
    getFilteredProducts(filters: string): Promise<Product[]> {
        const { condition, values }: FilterObject = this.generateFilterObjectFromString(filters)
        return this.createQueryBuilder('product')
            .leftJoinAndSelect('product.images', 'image')
            .leftJoinAndSelect('product.brand', 'brand')
            .where(condition, values)
            .getMany()
    }

    private generateFilterObjectFromString(filter: string): FilterObject {
        const filters: string[] = filter.split(' ')
        const properties: string[] = [
            'product.name',
            'product.description',
            'product.type',
            'brand.name'
        ]
        const filterObject: FilterObject = { condition: '', values: {} }
        filterObject.condition = filters.reduce(
            (condition, filter) =>
                `${condition} ${condition ? 'AND (' : '('} ${properties.reduce(
                    (result, property) =>
                        `${result} ${result ? 'OR' : ''} ${property} ILike '%${filter}%'`,
                    ''
                )} )`,
            ''
        )
        console.log(filterObject.condition)
        filterObject.values = { filter }
        return filterObject
    }
}
