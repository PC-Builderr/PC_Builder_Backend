import { Computer } from 'src/computer/computer.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(
        () => Computer,
        computer => computer.user
    )
    computers: Computer[]
}
