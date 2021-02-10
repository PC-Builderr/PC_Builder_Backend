import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { RefreshTokenPayload } from 'src/refresh-token/interface/RefreshTokenPayload'
import { User } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'
import { REFRESH_TOKEN, REFRESH_TOKEN_COOKIE_NAME } from 'src/utils/constants'

const extractRefreshTokenFromCookie = (req: Request): string => {
    const token: string = req.cookies[REFRESH_TOKEN_COOKIE_NAME]
    if (!token) {
        throw new BadRequestException()
    }

    return token
}

@Injectable()
export class RefreshTokenStartegy extends PassportStrategy(Strategy, REFRESH_TOKEN) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: extractRefreshTokenFromCookie,
            secretOrKey: process.env.REFRESH_TOKEN_SECRET
        })
    }

    async validate(payload: RefreshTokenPayload): Promise<User> {
        const user: User = await this.userService.findById(payload.id)

        if (user.tokenVersion !== payload.tokenVersion) {
            throw new UnauthorizedException()
        }

        return user
    }
}
