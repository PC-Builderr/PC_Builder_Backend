import { Brand } from 'src/brand/brand.entity'
import { Image } from 'src/image/image.entity'
import {
    AfterInsert,
    AfterLoad,
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(
        () => Image,
        image => image.product
    )
    images: Image[]

    @ManyToOne(
        () => Brand,
        brand => brand.products
    )
    brand: Brand

    @Column({ type: 'decimal', default: 0.0 })
    price: number

    @AfterLoad()
    @AfterInsert()
    parsePriceToDecimal() {
        this.price = parseFloat(this.price.toString())
    }
}
