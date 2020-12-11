import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import * as bcrypt from 'bcrypt'
import { AuthUserDto } from '../auth/dto/auth-user.dto'
import { CreateUserDto } from '../auth/dto/create-user.dto'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const password: string = await bcrypt.hash(createUserDto.password, 13)
        const user: User = this.userRepository.create({ ...createUserDto, password })
        return this.userRepository.save(user)
    }

    async findByEmail(email: string) {
        const user: User = await this.userRepository.findOne({ email })
        if (!user) throw new NotFoundException()
        return user
    }

    async findById(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne(id)
        if (!user) throw new NotFoundException()
        return user
    }

    async findAuthUser(authUserDto: AuthUserDto): Promise<User> {
        const { email, password } = authUserDto
        const user: User = await this.findByEmail(email)
        await this.verifyPassword(password, user.password)
        return user
    }

    private async verifyPassword(plainTextPassword: string, hashedPasword: string): Promise<void> {
        const valid: boolean = await bcrypt.compare(plainTextPassword, hashedPasword)
        if (!valid) throw new BadRequestException()
    }
}
