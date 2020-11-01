import { Product } from 'src/product/product.entity'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 'simon-berger-MxGPHq_UHaA-unsplash9868' })
    url: string

    @ManyToOne(
        () => Product,
        product => product.images
    )
    product: Product
}
