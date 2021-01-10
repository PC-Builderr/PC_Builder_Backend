import { Product } from '../entity/product.entity'

export interface ProductResponse<T> {
    product: T
}
export interface ProductArrayResponse {
    products: Product[]
    total: number
}
