import { Product } from 'src/product/product.entity'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(
        () => Product,
        product => product.brand
    )
    products: Array<Product>

    @Column()
    link: string
}
