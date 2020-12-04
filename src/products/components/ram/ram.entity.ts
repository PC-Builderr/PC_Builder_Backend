import { Product } from 'src/products/product/product.entity'
import {
    AfterInsert,
    AfterLoad,
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class RAM {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product, { eager: true })
    @JoinColumn()
    product: Product

    @Column()
    type: string

    @Column({ type: 'decimal' })
    voltage: number

    @Column()
    speed: number

    @Column()
    capacity: number

    @Column()
    tdp: number

    @AfterLoad()
    @AfterInsert()
    parseSpeedsToDecimal() {
        this.voltage = parseFloat(this.voltage.toString())
    }
}
