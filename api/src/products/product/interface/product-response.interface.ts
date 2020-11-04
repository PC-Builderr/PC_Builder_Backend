import { Product } from '../product.entity'

export interface ProductResponse {
    product: Product
}
export interface ProductArrayResponse {
    products: Array<Product>
}
