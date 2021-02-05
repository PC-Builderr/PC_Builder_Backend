import { User } from 'src/user/entity/user.entity'
import { Column, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderProduct } from './order-product.entity'

export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    total: number

    @Column()
    userId: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User

    @OneToMany(
        () => OrderProduct,
        orderProduct => orderProduct.orderId
    )
    orderProducts: OrderProduct[]
}
