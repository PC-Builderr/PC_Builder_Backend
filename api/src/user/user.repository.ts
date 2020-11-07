import { BadRequestException, NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDto } from '../auth/dto/create-user.dto'
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async getUserByEmail(email: string): Promise<User> {
        const user: User = await this.findOne({ email })
        if (!user) throw new NotFoundException('User with this email does not exist')
        return user
    }

    async checkIfEmailInUse(email: string): Promise<void> {
        const user: User = await this.findOne({ email })
        if (user) throw new BadRequestException('User with this email already exist')
    }

    createUser(createUserDto: CreateUserDto): Promise<User> {
        const user: User = this.create(createUserDto)
        return this.save(user)
    }
}
