import { Column, Entity } from 'typeorm'
import { Component } from '../../component.entity'

@Entity()
export class Motherboard extends Component {
    @Column()
    socket: string

    @Column()
    chipset: string

    @Column()
    ramCapacity: number

    @Column()
    maxRamSpeed: number

    @Column()
    ramSlots: number

    @Column()
    ramType: string

    @Column()
    m2Ports: number

    @Column()
    sataPorts: number

    @Column()
    pciSlots: number

    @Column()
    nvidiaSli: boolean

    @Column()
    amdCrossfire: boolean

    @Column()
    format: string

    @Column()
    consumption: number
}
