import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface'
import { User } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'
import { REFRESH_TOKEN } from 'src/utils/constants'

const extractRefreshTokenFromCookie = (req: Request): string => {
    const token: string = req.cookies['refresh_token']
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

    async validate(payload: JwtPayload): Promise<User> {
        return this.userService.findById(payload.id)
    }
}
