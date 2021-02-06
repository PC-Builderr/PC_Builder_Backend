import { User } from 'src/user/entity/user.entity'
import {
    AfterInsert,
    AfterLoad,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import { OrderProduct } from './order-product.entity'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'decimal' })
    shippingPrice: number

    @Column()
    productsPrice: number

    @Column({ type: 'decimal' })
    total: number

    @Column()
    status: string

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

    @AfterLoad()
    @AfterInsert()
    parseSpeedsToDecimal() {
        this.total = parseFloat(this.total.toString())
        this.shippingPrice = parseFloat(this.shippingPrice.toString())
    }
}
