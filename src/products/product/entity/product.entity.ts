import { Brand } from 'src/brand/entity/brand.entity'
import { Image } from 'src/image/entity/image.entity'
import {
    AfterInsert,
    AfterLoad,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
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

    @Column({ nullable: true })
    metaData: string

    @ManyToMany(() => Image)
    @JoinTable()
    images: Image[]

    @Column({ nullable: true })
    brandId: number
    @ManyToOne(
        () => Brand,
        brand => brand.products
    )
    @JoinColumn({ name: 'brandId' })
    brand: Brand

    @Column({ nullable: true })
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
