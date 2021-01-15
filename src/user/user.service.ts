import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { AuthUserDto } from '../auth/dto/auth-user.dto'
import { CreateUserDto } from '../auth/dto/create-user.dto'
import { User } from './entity/user.entity'

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
        if (!user) throw new NotFoundException('User Not Found')
        return user
    }

    async findById(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne(id)
        if (!user) throw new NotFoundException('User Not Found')
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
        if (!valid) throw new BadRequestException('Wrong Password')
    }

    private async revokeTokensForUser(id: number) {
        const user: User = await this.findById(id)
        this.userRepository.increment(user, 'tokenVersion', 1)
    }
}
