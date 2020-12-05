import { Brand } from 'src/brand/brand.entity'
import { Image } from 'src/image/image.entity'
import {
    AfterInsert,
    AfterLoad,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(
        () => Image,
        image => image.product,
        {
            eager: true
        }
    )
    images: Image[]

    @ManyToOne(
        () => Brand,
        brand => brand.products,
        {
            eager: true
        }
    )
    brand: Brand

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    type: string

    @AfterLoad()
    @AfterInsert()
    parsePriceToDecimal() {
        this.price = parseInt(this.price.toString())
    }
}
