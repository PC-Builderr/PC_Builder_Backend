import { Column, Entity } from 'typeorm'
import { Component } from '../../component.entity'

@Entity()
export class Case extends Component {
    @Column()
    format: string
}
