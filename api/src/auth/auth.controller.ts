import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { LoginResponse, RegisterResponse } from './interface/auth-response.interface'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<RegisterResponse> {
        const authToken: string = await this.authService.register(createUserDto)
        return { authToken }
    }

    @Post('login')
    async login(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<LoginResponse> {
        return this.authService.login(authUserDto)
    }
}
