import { Storage } from 'src/products/components/storage/entity/storage.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Computer } from './computer.entity'

@Entity()
export class ComputerStorage {
    @PrimaryColumn()
    computerId: number

    @PrimaryColumn()
    storageId: number

    @Column()
    quantity: number

    @ManyToOne(() => Storage)
    @JoinColumn({ name: 'storageId' })
    storage: Storage

    @ManyToOne(
        () => Computer,
        computer => computer.storages
    )
    @JoinColumn({ name: 'computerId' })
    computer: Computer
}
