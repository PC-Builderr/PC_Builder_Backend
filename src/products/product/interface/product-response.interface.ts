import { Product } from '../entity/product.entity'

export interface ProductResponse<T> {
    component: T
}
export interface ProductArrayResponse {
    products: Product[]
    total: number
}
