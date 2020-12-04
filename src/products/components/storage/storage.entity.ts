import { Product } from 'src/products/product/product.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Storage {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product, { eager: true })
    @JoinColumn()
    product: Product

    @Column()
    type: string

    @Column()
    capacity: number

    @Column()
    tdp: number
}
