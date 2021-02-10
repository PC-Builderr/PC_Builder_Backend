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

    @Column({ nullable: true })
    shipmentNumber: string

    @Column({ nullable: true })
    paymentIntentId: string

    @Column()
    status: string

    @Column({ nullable: true })
    adminId: number

    @ManyToOne(() => Admin)
    @JoinColumn({ name: 'adminId' })
    admin: Admin

    @Column()
    userId: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({ nullable: true })
    shippingAddressId: number

    @ManyToOne(() => ShippingAddress)
    @JoinColumn({ name: 'shippingAddressId' })
    shippingAddress: ShippingAddress

    @Column({ type: 'date', nullable: true })
    expectedDeliveryDate: Date

    @Column({ nullable: true })
    pdfURL: string

    @Column({ nullable: true })
    recieptUrl: string

    @OneToMany(
        () => OrderProduct,
        orderProduct => orderProduct.order
    )
    orderProducts: OrderProduct[]

    @Column()
    productsPrice: number

    @Column({ type: 'decimal' })
    shippingPrice: number

    @Column({ type: 'decimal' })
    total: number

    @AfterLoad()
    @AfterInsert()
    parsePricesToDecimal() {
        this.total = parseFloat(this.total.toString())
        this.shippingPrice = parseFloat(this.shippingPrice.toString())
    }
}
