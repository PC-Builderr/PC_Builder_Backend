import { Product } from 'src/products/product/product.entity'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('images')
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 'https://www.chanchao.com.tw/IPF/images/default.jpg' })
    url: string

    @ManyToOne(
        () => Product,
        product => product.images
    )
    product: Product
}
