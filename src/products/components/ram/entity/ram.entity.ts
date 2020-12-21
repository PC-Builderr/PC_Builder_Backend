import { AfterInsert, AfterLoad, Column, Entity } from 'typeorm'
import { Component } from '../../component.entity'

@Entity()
export class RAM extends Component {
    @Column()
    type: string

    @Column({ type: 'decimal' })
    voltage: number

    @Column()
    speed: number

    @Column()
    capacity: number

    @Column()
    consumption: number

    @AfterLoad()
    @AfterInsert()
    parseSpeedsToDecimal() {
        this.voltage = parseFloat(this.voltage.toString())
    }
}
