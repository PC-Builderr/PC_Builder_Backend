import {
    BadRequestException,
    Body,
    Controller,
    Post,
    Req,
    Res,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { errorHandler } from 'src/utils/error-handler'
import { AuthService } from './auth.service'
import { TokenResponse } from './interface/auth-response.interface'
import { Request, Response } from 'express'
import { RefreshTokenGuard } from 'src/auth/guard/refresh-token.guard'
import { User } from 'src/user/entity/user.entity'
import { RefreshTokenRequest } from './interface/refresh-token-request.interface'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const { refreshToken, token }: TokenResponse = await this.authService.signUp(
                createUserDto
            )
            res.cookie('jid', refreshToken, {
                httpOnly: true
            })
            res.json({ token })
        } catch (error) {
            errorHandler(error)
        }
    }

    @Post('sign-in')
    async signIn(@Body(ValidationPipe) authUserDto: AuthUserDto, @Res() res: Response) {
        const { refreshToken, token }: TokenResponse = await this.authService.signIn(authUserDto)
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true
        })
        res.json({ token })
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh-token')
    refresh(@Req() req: RefreshTokenRequest) {
        const token: string = this.authService.signToken(req.user.id)
        return { token }
    }
}
