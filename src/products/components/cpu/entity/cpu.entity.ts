import { AfterInsert, AfterLoad, Column, Entity } from 'typeorm'
import { Component } from '../../component.entity'

@Entity()
export class CPU extends Component {
    @Column()
    model: string

    @Column()
    generation: string

    @Column()
    series: string

    @Column()
    socket: string

    @Column()
    core: number

    @Column()
    thread: number

    @Column({ type: 'decimal' })
    speed: number

    @Column({ type: 'decimal' })
    turboSpeed: number

    @Column()
    ramCapacity: number

    @Column()
    maxRamSpeed: number

    @Column()
    ramChannels: number

    @Column()
    ramType: string

    @Column()
    cache: string

    @Column({ nullable: true })
    integratedGraphics: string

    @Column()
    consumption: number

    @AfterLoad()
    @AfterInsert()
    parseSpeedsToDecimal() {
        this.speed = parseFloat(this.speed.toString())
        this.turboSpeed = parseFloat(this.turboSpeed.toString())
    }
}
