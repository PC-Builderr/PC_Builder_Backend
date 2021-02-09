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

    @ManyToOne(() => Product, { primary: true })
    @JoinColumn({ name: 'productId' })
    product: Product

    @ManyToOne(
        () => Order,
        order => order.orderProducts,
        { primary: true }
    )
    @JoinColumn({ name: 'orderId' })
    order: Order
}
