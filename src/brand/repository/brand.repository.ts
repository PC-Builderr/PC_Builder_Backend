import { EntityRepository, Repository } from 'typeorm'
import { Brand } from '../entity/brand.entity'

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {
    findByProductType(type: string): Promise<Brand[]> {
        return this.createQueryBuilder('brand')
            .leftJoin('brand.products', 'products')
            .where('products.type = :type', { type })
            .cache({ id: `brand:${type}`, milliseconds: 10000 })
            .getMany()
    }
}
