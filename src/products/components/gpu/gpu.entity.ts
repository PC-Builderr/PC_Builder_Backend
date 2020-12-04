import { Product } from 'src/products/product/product.entity'
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class GPU {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product, { eager: true })
    @JoinColumn()
    product: Product

    @Column()
    series: string

    @Column()
    speed: number

    @Column()
    memory: number

    @Column()
    memoryType: string

    @Column()
    busWidth: number

    @Column()
    format: string

    @Column()
    tdp: number
}
