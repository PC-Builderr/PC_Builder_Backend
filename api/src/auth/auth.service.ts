import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/user.entity'
import { AuthUserDto, CreateUserDto, JwtPayload } from 'src/users/user.model'
import { UserService } from 'src/users/user.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async register(createUserDto: CreateUserDto): Promise<string> {
        const user: User = await this.userService.createUser(createUserDto)
        console.log(user)
        return this.signToken(user.email)
    }

    async login(authUserDto: AuthUserDto): Promise<string> {
        const user: User = await this.userService.getAuthUser(authUserDto)
        console.log(user)
        return this.signToken(user.email)
    }

    private signToken(email: string): string {
        const payload: JwtPayload = { email }
        return this.jwtService.sign(payload)
    }
}
