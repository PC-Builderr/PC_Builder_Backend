import { Product } from '../product.entity'

export interface ProductResponse<T> {
    product: T
}
export interface ProductArrayResponse {
    products: Product[]
}
