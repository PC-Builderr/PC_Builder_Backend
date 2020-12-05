import { FilterObject } from 'src/utils/interface'
import { EntityRepository, Repository } from 'typeorm'
import { Product } from './product.entity'

@EntityRepository(Product)
export class ProductRepositry extends Repository<Product> {
    getFilteredProducts(filters: string): Promise<Product[]> {
        const { where, parameters }: FilterObject = this.generateFilterObjectFromString(filters)
        return this.createQueryBuilder('product')
            .leftJoinAndSelect('product.images', 'image')
            .leftJoinAndSelect('product.brand', 'brand')
            .where(where, parameters)
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
        const filterObject: FilterObject = { where: '', parameters: {} }
        filterObject.where = filters.reduce(
            (where, filter) =>
                `${where} ${where ? 'AND (' : '('} ${properties.reduce(
                    (result, property) =>
                        `${result} ${result ? 'OR' : ''} ${property} ILike '%${filter}%'`,
                    ''
                )} )`,
            ''
        )
        return filterObject
    }
}
