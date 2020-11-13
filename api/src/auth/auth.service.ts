import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AdminService } from 'src/admin/admin.service'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { User } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { LoginResponse } from './interface/auth-response.interface'
import { JwtPayload } from './interface/jwt-payload.interface'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly adminService: AdminService
    ) {}

    async register(createUserDto: CreateUserDto): Promise<string> {
        const user: User = await this.userService.createUser(createUserDto)
        return user.email ? this.signToken(user.email) : null
    }

    async login(authUserDto: AuthUserDto): Promise<LoginResponse> {
        const user: User = await this.userService.getAuthUser(authUserDto)
        const authToken: string = this.signToken(user.email)
        const adminToken: string = await this.adminService.getAccessByUser(user)
        return adminToken ? { authToken, adminToken } : { authToken }
    }

    private signToken(email: string): string {
        const payload: JwtPayload = { email }
        return this.jwtService.sign(payload)
    }
}
