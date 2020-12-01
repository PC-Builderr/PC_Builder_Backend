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
export class CPU {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product, { eager: true })
    @JoinColumn()
    product: Product

    @Column()
    model: string

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

    @Column({ type: 'decimal' })
    speed: number

    @Column({ type: 'decimal' })
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

    @AfterLoad()
    @AfterInsert()
    parseSpeedsToDecimal() {
        this.speed = parseFloat(this.speed.toString())
        this.turboSpeed = parseFloat(this.turboSpeed.toString())
    }
}
