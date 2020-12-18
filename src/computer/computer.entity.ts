import { User } from 'src/user/user.entity'
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { Product } from '../products/product/product.entity'

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

    @ManyToMany(() => Product)
    @JoinTable()
    components: Product[]
}
