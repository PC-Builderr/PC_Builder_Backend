import { Product } from 'src/products/product/entity/product.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column({ nullable: true })
    productId: number
    @ManyToOne(
        () => Product,
        product => product.images
    )
    @JoinColumn({ name: 'productId' })
    product: Product
}
