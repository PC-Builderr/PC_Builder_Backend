import { Image } from 'src/image/image.entity'
import { AfterInsert, AfterLoad, BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('products')
export class Product extends BaseEntity {
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

    @Column()
    brand: string

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
