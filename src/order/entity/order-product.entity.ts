import { Product } from 'src/products/product/entity/product.entity'
import { JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Order } from './order.entity'

export class OrderProduct {
    @PrimaryColumn()
    orderId: number

    @PrimaryColumn()
    productId: number

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product

    @ManyToOne(
        () => Order,
        order => order.orderProducts
    )
    @JoinColumn({ name: 'orderId' })
    order: Order
}
