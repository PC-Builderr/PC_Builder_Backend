import { User } from 'src/user/user.entity'
import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}