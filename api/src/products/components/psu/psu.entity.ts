import { Product } from 'src/products/product/product.entity'
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class PSU {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product, { eager: true })
    @JoinColumn()
    product: Product

    @Column()
    power: number

    @Column()
    efficiency: number
}
