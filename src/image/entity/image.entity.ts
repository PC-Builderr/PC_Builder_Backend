import { Product } from 'src/products/product/entity/product.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string
}
