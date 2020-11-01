import { EntityRepository, Repository } from 'typeorm'
import { Product } from './product.entity'
import { CreateProductDto } from './product.models'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { name, price } = createProductDto
        const product = new Product()
        product.name = name
        product.price = price
        return product.save()
    }
}
