import { Column, Entity } from 'typeorm'
import { Component } from '../../component.entity'

@Entity()
export class GPU extends Component {
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
