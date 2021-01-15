import { Body, Controller, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { errorHandler } from 'src/utils/error-handler'
import { AuthService } from './auth.service'
import { TokenResponse } from './interface/auth-response.interface'
import { Response } from 'express'
import { RefreshTokenGuard } from 'src/auth/guard/refresh-token.guard'
import { RefreshTokenRequest } from './interface/refresh-token-request.interface'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const tokenResponse: TokenResponse = await this.authService.signUp(createUserDto)
            this.sendResponse(res, tokenResponse)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Post('sign-in')
    async signIn(@Body(ValidationPipe) authUserDto: AuthUserDto, @Res() res: Response) {
        const tokenResponse: TokenResponse = await this.authService.signIn(authUserDto)
        this.sendResponse(res, tokenResponse)
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh-token')
    refresh(@Req() req: RefreshTokenRequest, @Res() res: Response) {
        const tokenResponse: TokenResponse = this.authService.getTokens(req.user)
        this.sendResponse(res, tokenResponse)
    }

    private sendResponse(res: Response, tokenResponse: TokenResponse) {
        res.cookie('refresh_token', tokenResponse.refreshToken, {
            httpOnly: true
        })
        res.status(201).json({ token: tokenResponse.token })
    }
}
