import { Product } from 'src/products/product/product.entity'
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Component } from '../component.entity'

@Entity()
export class GPU extends Component {
    @Column()
    series: string

    @Column()
    speed: number

    @Column()
    memory: number

    @Column()
    memoryType: string

    @Column()
    busWidth: number

    @Column()
    format: string

    @Column()
    consumption: number
}
