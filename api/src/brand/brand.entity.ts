import { Image } from 'src/image/image.entity'
import { Product } from 'src/products/product/product.entity'
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('brands')
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(
        () => Product,
        product => product.brand
    )
    products: Product[]

    @OneToOne(() => Image, { eager: true })
    @JoinColumn()
    image: Image

    @Column()
    link: string
}
