import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '../product/product.entity'

export abstract class Component {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productId: number
    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product
}
