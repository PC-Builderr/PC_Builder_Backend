import { FilterObject } from 'src/utils/interface'
import { EntityRepository, ObjectLiteral, Repository } from 'typeorm'
import { Product } from '../entity/product.entity'
import { FindProduct } from '../interface/find-product.interface'
import { ProductArrayResponse } from '../interface/product-response.interface'

@EntityRepository(Product)
export class ProductRepositry extends Repository<Product> {
    async findFiltered({ count, page, search }: FindProduct): Promise<ProductArrayResponse> {
        const queryBuilder = this.createQueryBuilder('product')
        const where: string = this.generateFilterObjectFromString(search)
        const [products, total] = await Promise.all([
            queryBuilder
                .leftJoinAndSelect('product.images', 'image')
                .leftJoinAndSelect('product.brand', 'brand')
                .where(where)
                .skip((page - 1) * count)
                .take(count)
                .getMany(),
            queryBuilder.getCount()
        ])
        return { products, total }
    }

    private generateFilterObjectFromString(filter: string): string {
        if (!filter) return ''

        return filter
            .trim()
            .split(' ')
            .reduce(
                (where: string, value: string) =>
                    `${where} ${where ? 'OR ' : ''} product.metaData ILike '%${value}%' `,
                ''
            )
    }
}
