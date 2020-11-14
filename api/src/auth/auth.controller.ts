import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { TokenResponse } from './interface/auth-response.interface'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<TokenResponse> {
        const token: string = await this.authService.register(createUserDto)
        return { token }
    }

    @Post('login')
    async login(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<TokenResponse> {
        const token: string = await this.authService.login(authUserDto)
        return { token }
    }
}
