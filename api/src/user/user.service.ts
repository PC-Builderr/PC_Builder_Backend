import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import * as bcrypt from 'bcrypt'
import { AuthUserDto } from './dto/auth-user.dto'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async getAuthUser(authUserDto: AuthUserDto): Promise<User> {
        const { email, password } = authUserDto
        const user: User = await this.userRepository.getUserByEmail(email)
        await this.verifyPassword(password, user.password)
        return user
    }

    private async verifyPassword(plainTextPassword: string, hashedPasword: string): Promise<void> {
        const valid: boolean = await bcrypt.compare(plainTextPassword, hashedPasword)
        if (!valid) throw new BadRequestException('Password not valid')
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        await this.userRepository.checkIfEmailInUse(createUserDto.email)
        createUserDto.password = await bcrypt.hash(createUserDto.password, 13)
        return this.userRepository.createUser(createUserDto)
    }
}
