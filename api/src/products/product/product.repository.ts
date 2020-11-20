import { Image } from 'src/image/image.entity'
import { FilterObject } from 'src/utils/interface'
import { EntityRepository, Repository } from 'typeorm'
import { Product } from './product.entity'

@EntityRepository(Product)
export class ProductRepositry extends Repository<Product> {
    getFilteredProducts(filters: string): Promise<Product[]> {
        const { condition, values }: FilterObject = this.generateFilterObjectFromString(filters)
        return this.createQueryBuilder('product')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('brand.image', 'image')
            .leftJoinAndSelect('product.images', 'image2')
            .where(condition, values)
            .getMany()
    }

    private generateFilterObjectFromString(filter: string): FilterObject {
        const filters: string[] = filter.split(' ')
        const properties: string[] = ['product.name', 'product.description', 'product.type', 'brand.name']
        const filterObject: FilterObject = { condition: '', values: {} }
        filterObject.condition = properties
            .reduce((a, v) => {
                return `${a} ${filters.reduce((ac, f) => `${ac} ${v} ILike '%${f}%' OR `, '')}`
            }, '')
            .slice(0, filterObject.condition.length - 3)
        filterObject.values = { filter }
        return filterObject
    }
}
