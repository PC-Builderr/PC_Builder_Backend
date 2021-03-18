import { Exclude } from 'class-transformer'
import { Computer } from 'src/computer/entity/computer.entity'
import { ShippingAddress } from 'src/order/entity/shippingAddress.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ default: 0 })
    tokenVersion: number

    @OneToMany(
        () => Computer,
        computer => computer.user
    )
    computers: Computer[]

    @OneToMany(
        () => ShippingAddress,
        shippingAddress => shippingAddress.user
    )
    shippingAddresses: ShippingAddress[]
}
