import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { CreateUserDto, AuthUserDto, JwtPayload } from './user.model'
import { UserRepository } from './user.repository'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    async login(authUserDto: AuthUserDto): Promise<string> {
        const { email, password } = authUserDto
        const user: User = await this.userRepository.getUserByEmail(email)
        await this.verifyPassword(password, user.password)
        return this.signToken(user.email)
    }

    private async verifyPassword(plainTextPassword: string, hashedPasword: string): Promise<void> {
        const valid: boolean = await bcrypt.compare(plainTextPassword, hashedPasword)
        if (!valid) throw new BadRequestException('Password not valid')
    }

    private signToken(email: string): string {
        const payload: JwtPayload = { email }
        return this.jwtService.sign(payload)
    }

    async createUser(createUserDto: CreateUserDto): Promise<string> {
        this.userRepository.checkIfEmailInUse(createUserDto.email)
        createUserDto.password = await bcrypt.hash(createUserDto.password, 13)
        const user: User = await this.userRepository.createUser(createUserDto)
        return this.signToken(user.email)
    }
}
