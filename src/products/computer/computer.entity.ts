import { User } from 'src/user/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Case } from '../components/case/case.entity'
import { CPU } from '../components/cpu/cpu.entity'
import { GPU } from '../components/gpu/gpu.entity'
import { Motherboard } from '../components/motherboard/motherboard.entity'
import { PSU } from '../components/psu/psu.entity'
import { RAM } from '../components/ram/ram.entity'
import { Storage } from '../components/storage/storage.entity'

@Entity()
export class Computer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number
    @ManyToOne(
        () => User,
        user => user.computers
    )
    @JoinColumn({ name: 'userId' })
    user: User

    @Column()
    cpuId: number
    @OneToOne(() => CPU)
    @JoinColumn({ name: 'cpuId' })
    cpu: CPU

    @Column()
    gpuId: number
    @OneToOne(() => GPU)
    @JoinColumn({ name: 'gpuId' })
    gpu: GPU

    @Column()
    motherBoardId: number
    @OneToOne(() => Motherboard)
    @JoinColumn({ name: 'motherBoardId' })
    motherboard: Motherboard

    @Column()
    caseId: number
    @OneToOne(() => Case)
    @JoinColumn({ name: 'caseId' })
    case: Case

    @Column()
    storageId: number
    @OneToOne(() => Storage)
    @JoinColumn({ name: 'storageId' })
    storage: Storage

    @Column()
    ramId: number
    @OneToOne(() => RAM)
    @JoinColumn({ name: 'ramId' })
    ram: RAM

    @Column()
    psuId: number
    @OneToOne(() => PSU)
    @JoinColumn({ name: 'psuId' })
    psu: PSU
}
