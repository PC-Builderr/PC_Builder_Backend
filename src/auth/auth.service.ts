import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { User } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { JwtPayload } from './interface/jwt-payload.interface'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async signUp(createUserDto: CreateUserDto): Promise<string> {
        const user: User = await this.userService.create(createUserDto)
        return this.signToken(user.id)
    }

    async signIn(authUserDto: AuthUserDto): Promise<string> {
        const user: User = await this.userService.findAuthUser(authUserDto)
        return this.signToken(user.id)
    }

    private signToken(id: number): string {
        const payload: JwtPayload = { id }
        return this.jwtService.sign(payload)
    }
}
