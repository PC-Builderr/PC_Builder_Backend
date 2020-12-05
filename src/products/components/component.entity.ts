import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '../product/product.entity'

@Entity()
export class Component {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productId: number
    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product
}
