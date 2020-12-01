import { Product } from 'src/products/product/product.entity'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(
        () => Product,
        product => product.images
    )
    product: Product
}
