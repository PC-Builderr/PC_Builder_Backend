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
        const authToken: string = await this.authService.register(createUserDto)
        return { authToken }
    }

    @Post('login')
    async login(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<TokenResponse> {
        return this.authService.login(authUserDto)
    }
}
