import { Product } from 'src/products/product/entity/product.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Order } from './order.entity'

@Entity()
export class OrderProduct {
    @PrimaryColumn()
    orderId: number

    @PrimaryColumn()
    productId: number

    @Column()
    quantity: number

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
