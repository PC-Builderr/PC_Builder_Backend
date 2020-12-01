import { Image } from 'src/image/image.entity'
import { Product } from 'src/products/product/product.entity'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('brands')
export class Brand {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(
        () => Product,
        product => product.brand
    )
    products: Product[]
}
