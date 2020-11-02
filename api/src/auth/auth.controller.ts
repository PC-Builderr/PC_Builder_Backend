import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthUserDto, CreateUserDto } from 'src/users/user.model'
import { JwtResponse } from './auth.models'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<JwtResponse> {
        const token: string = await this.authService.register(createUserDto)
        return { token }
    }

    @Post('login')
    async login(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<JwtResponse> {
        const token: string = await this.authService.login(authUserDto)
        return { token }
    }
}
