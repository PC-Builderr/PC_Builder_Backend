import { Product } from 'src/products/product/product.entity'
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CPU extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product)
    @JoinColumn()
    product: Product

    @Column()
    Model: string

    @Column()
    generation: string

    @Column()
    series: string

    @Column()
    socket: string

    @Column()
    core: number

    @Column()
    thread: number

    @Column()
    speed: number

    @Column()
    turboSpeed: number

    @Column()
    ramCapacity: number

    @Column()
    maxRamSpeed: number

    @Column()
    ramChannels: number

    @Column()
    ramType: string

    @Column()
    tdp: number
}
