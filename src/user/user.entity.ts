import { Computer } from 'src/products/computer/computer.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(
        () => Computer,
        computer => computer.user
    )
    computers: Computer[]
}
