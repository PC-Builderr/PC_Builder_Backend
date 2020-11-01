import { Image } from 'src/image/image.entity'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(
        () => Image,
        image => image.product
    )
    images: Image[]

    @Column({ type: 'decimal', default: 0.0 })
    price: number
}
