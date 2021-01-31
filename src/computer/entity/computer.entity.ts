import { Case } from 'src/products/components/case/entity/case.entity'
import { CPU } from 'src/products/components/cpu/entity/cpu.entity'
import { GPU } from 'src/products/components/gpu/entity/gpu.entity'
import { Motherboard } from 'src/products/components/motherboard/entity/motherboard.entity'
import { PSU } from 'src/products/components/psu/entity/psu.entity'
import { RAM } from 'src/products/components/ram/entity/ram.entity'
import { Storage } from 'src/products/components/storage/entity/storage.entity'
import { User } from 'src/user/entity/user.entity'
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ComputerStorage } from './storage-quantity.entity'

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
    cpuProductId: number
    @ManyToOne(() => CPU)
    @JoinColumn({ name: 'cpuProductId', referencedColumnName: 'productId' })
    cpu: CPU

    @Column()
    motherboardProductId: number
    @ManyToOne(() => Motherboard)
    @JoinColumn({ name: 'motherboardProductId', referencedColumnName: 'productId' })
    motherboard: Motherboard

    @Column()
    chassisProductId: number
    @ManyToOne(() => Case)
    @JoinColumn({ name: 'chassisProductId', referencedColumnName: 'productId' })
    chassis: Case

    @Column()
    psuProductId: number
    @ManyToOne(() => PSU)
    @JoinColumn({ name: 'psuProductId', referencedColumnName: 'productId' })
    psu: PSU

    @Column()
    ramQuantity: number
    @Column()
    ramProductId: number
    @ManyToOne(() => RAM)
    @JoinColumn({ name: 'ramProductId', referencedColumnName: 'productId' })
    ram: RAM

    @Column({ default: 0 })
    gpuQuantity: number
    @Column({ nullable: true })
    gpuProductId: number
    @ManyToOne(() => GPU, {
        nullable: true
    })
    @JoinColumn({ name: 'gpuProductId', referencedColumnName: 'productId' })
    gpu?: GPU

    @OneToMany(
        () => ComputerStorage,
        computerStorage => computerStorage.computer
    )
    @JoinTable()
    storages: ComputerStorage[]
}
