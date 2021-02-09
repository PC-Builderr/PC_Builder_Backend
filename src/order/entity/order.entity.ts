import { Admin } from 'src/admin/entity/admin.entity'
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
import { ShippingAddress } from './shippingAddress.entity'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'decimal' })
    shippingPrice: number

    @Column()
    productsPrice: number

    @Column({ nullable: true })
    recieptUrl: string

    @Column({ nullable: true })
    paymentIntentId: string

    @Column({ type: 'decimal' })
    total: number

    @Column()
    status: string

    @Column()
    userId: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({ nullable: true })
    adminId: number

    @ManyToOne(() => Admin)
    @JoinColumn({ name: 'adminId' })
    admin: Admin

    @Column({ nullable: true })
    shippingAddressId: number

    @ManyToOne(() => ShippingAddress)
    @JoinColumn({ name: 'shippingAddressId' })
    shippingAddress: ShippingAddress

    @OneToMany(
        () => OrderProduct,
        orderProduct => orderProduct.order
    )
    orderProducts: OrderProduct[]

    @AfterLoad()
    @AfterInsert()
    parseSpeedsToDecimal() {
        this.total = parseFloat(this.total.toString())
        this.shippingPrice = parseFloat(this.shippingPrice.toString())
    }
}
