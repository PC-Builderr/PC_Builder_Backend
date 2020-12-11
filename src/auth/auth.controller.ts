import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { TokenResponse } from './interface/auth-response.interface'
import { AuthService } from './auth.service'
import { errorHandler } from 'src/utils/error-handler'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<TokenResponse> {
        try {
            const token: string = await this.authService.signUp(createUserDto)
            return { token }
        } catch (error) {
            errorHandler(error)
        }
    }

    @Post('sign-in')
    async signIn(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<TokenResponse> {
        const token: string = await this.authService.signIn(authUserDto)
        return { token }
    }
}
