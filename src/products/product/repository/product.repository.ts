import { FilterObject } from 'src/utils/interface'
import { EntityRepository, Repository } from 'typeorm'
import { Product } from '../entity/product.entity'
import { FindProduct } from '../interface/find-product.interface'
import { ProductArrayResponse } from '../interface/product-response.interface'

@EntityRepository(Product)
export class ProductRepositry extends Repository<Product> {
    async findFiltered({ count, page, search }: FindProduct): Promise<ProductArrayResponse> {
        const queryBuilder = this.createQueryBuilder('product')
        const { where, parameters }: FilterObject = this.generateFilterObjectFromString(search)

        const [products, total] = await Promise.all([
            queryBuilder
                .leftJoinAndSelect('product.images', 'image')
                .leftJoinAndSelect('product.brand', 'brand')
                .where(where, parameters)
                .skip((page - 1) * count)
                .take(count)
                .getMany(),
            queryBuilder.getCount()
        ])
        return { products, total }
    }

    private generateFilterObjectFromString(filter: string): FilterObject {
        const filterObject: FilterObject = { where: '', parameters: {} }
        if (!filter) return filterObject
        const filters: string[] = filter.trim().split(' ')
        const properties: string[] = [
            'product.name',
            'product.description',
            'product.type',
            'brand.name'
        ]
        filterObject.where = filters.reduce(
            (where, filter) =>
                `${where} ${where ? 'OR (' : '('} ${properties.reduce(
                    (result, property) =>
                        `${result} ${result ? 'OR' : ''} ${property} ILike '%${filter}%'`,
                    ''
                )} )`,
            ''
        )
        return filterObject
    }
}
