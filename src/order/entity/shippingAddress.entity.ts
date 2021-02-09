import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ShippingAddress {
    @PrimaryGeneratedColumn()
    id: number

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
