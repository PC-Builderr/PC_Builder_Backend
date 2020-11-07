import { Brand } from 'src/products/additions/brand/brand.entity'
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
import { CASE_TYPE } from 'src/utils/constants'

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(
        () => Image,
        image => image.product
    )
    images: Array<Image>

    @ManyToOne(
        () => Brand,
        brand => brand.products
    )
    brand: Brand

    @Column()
    description: string

    @Column({ type: 'decimal', default: 0.0 })
    price: number

    @Column({ default: '' })
    type: string

    @AfterLoad()
    @AfterInsert()
    parsePriceToDecimal() {
        this.price = parseFloat(this.price.toString())
    }
}
