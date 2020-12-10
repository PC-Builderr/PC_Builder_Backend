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
        return this.signToken(user)
    }

    async signIn(authUserDto: AuthUserDto): Promise<string> {
        const user: User = await this.userService.getAuthUser(authUserDto)
        return this.signToken(user)
    }

    private signToken({ name, email }: User): string {
        const payload: JwtPayload = {
            user: {
                name,
                email
            }
        }
        return this.jwtService.sign(payload)
    }
}
