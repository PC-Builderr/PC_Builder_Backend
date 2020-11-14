import { Product } from 'src/products/product/product.entity'
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Motherboard extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product, { eager: true })
    @JoinColumn()
    product: Product

    @Column()
    socket: string

    @Column()
    chipset: string

    @Column()
    ramCapacity: number

    @Column()
    maxRamSpeed: number

    @Column()
    ramChannels: number

    @Column()
    ramType: string

    @Column()
    m2Port: number

    @Column()
    sataPort: number

    @Column()
    pciSlots: number

    @Column('text', { array: true })
    ports: string[]

    @Column()
    nvidiaSli: boolean

    @Column()
    amdCrossfire: boolean

    @Column()
    format: string

    @Column()
    tdp: number
}
