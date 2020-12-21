import { Product } from 'src/products/product/entity/product.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
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
