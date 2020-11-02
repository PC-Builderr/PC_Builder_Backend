import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AdminService } from 'src/admin/admin.service'
import { User } from 'src/users/user.entity'
import { AuthUserDto, CreateUserDto } from 'src/users/user.model'
import { UserService } from 'src/users/user.service'
import { JwtPayload } from './auth.models'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly adminService: AdminService
    ) {}

    async register(createUserDto: CreateUserDto): Promise<string> {
        const user: User = await this.userService.createUser(createUserDto)
        return this.signToken(user.email)
    }

    async login(authUserDto: AuthUserDto): Promise<string> {
        const user: User = await this.userService.getAuthUser(authUserDto)
        return this.signToken(user.email)
    }

    private signToken(email: string): string {
        const payload: JwtPayload = { email }
        return this.jwtService.sign(payload)
    }
}
