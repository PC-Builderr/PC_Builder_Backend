import { Product } from 'src/products/product/product.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Component } from '../component.entity'

@Entity()
export class Storage extends Component {
    @Column()
    type: string

    @Column()
    capacity: number

    @Column()
    readSpeed: number

    @Column()
    writeSpeed: number

    @Column()
    consumption: number
}
