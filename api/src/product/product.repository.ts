import { Image } from 'src/image/image.entity'
import { EntityRepository, Repository } from 'typeorm'
import { Product } from './product.entity'
import { CreateProductDto } from './product.models'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    createProduct(createProductDto: CreateProductDto, images: Array<Image>) {
        const { name, price } = createProductDto
        const product: Product = new Product()
        product.name = name
        product.images = images
        product.price = price
        return this.save(product)
    }
}
