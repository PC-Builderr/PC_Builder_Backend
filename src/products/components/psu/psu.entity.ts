import { Column, Entity } from 'typeorm'
import { Component } from '../component.entity'

@Entity()
export class PSU extends Component {
    @Column()
    power: number

    @Column()
    efficiency: number

    @Column()
    certificate: string

    @Column()
    modular: boolean
}
