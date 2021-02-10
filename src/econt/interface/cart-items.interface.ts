import { Product } from 'src/products/product/entity/product.entity'

export interface CartItems {
    product: Product
    quantity: number
}
