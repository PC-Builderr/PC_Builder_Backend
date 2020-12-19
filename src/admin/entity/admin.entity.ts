import { User } from 'src/user/entity/user.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number
    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User
}
