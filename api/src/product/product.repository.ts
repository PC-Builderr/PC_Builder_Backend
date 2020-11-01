import { Image } from 'src/image/image.entity'
import { EntityRepository, Repository } from 'typeorm'
import { Product } from './product.entity'
import { CreateProductDto } from './product.models'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    createProduct(createProductDto: CreateProductDto) {
        const product: Product = this.create(createProductDto)
        return this.save(product)
    }
}
