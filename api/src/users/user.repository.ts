import { BadRequestException, NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './user.model'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async getUserByEmail(email: string): Promise<User> {
        const user: User = await this.findOne({ email })
        if (!user) throw new BadRequestException()
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
