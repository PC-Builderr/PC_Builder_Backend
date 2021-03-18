import { User } from 'src/user/entity/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ShippingAddress {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    city: string

    @Column()
    address: string

    @Column()
    postCode: string
}
