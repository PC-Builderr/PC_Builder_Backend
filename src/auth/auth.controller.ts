import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
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
import { Response } from 'express'
import { RefreshTokenGuard } from 'src/auth/guard/refresh-token.guard'
import { AuthenticatedRequest } from './interface/refresh-token-request.interface'
import { AuthGuard } from '@nestjs/passport'
import { AUTH, REFRESH_TOKEN_COOKIE_NAME } from 'src/utils/constants'
import { pathToFileURL } from 'url'
import { AuthJwtGuard } from './guard/auth.guard'

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

    @UseGuards(AuthJwtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Res() res: Response) {
        this.sendResponse(res, { refreshToken: '', token: '' })
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh-token')
    getAccessTokenFromRefreshToken(@Req() req: AuthenticatedRequest, @Res() res: Response) {
        const tokenResponse: TokenResponse = this.authService.getTokens(req.user)
        this.sendResponse(res, tokenResponse)
    }

    private sendResponse(res: Response, tokenResponse: TokenResponse) {
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, tokenResponse.refreshToken, {
            httpOnly: true,
            path: '/api/auth/refresh-token'
            // sameSite: 'none',
            // secure: true
        })
        res.status(201).json({ token: tokenResponse.token })
    }
}
