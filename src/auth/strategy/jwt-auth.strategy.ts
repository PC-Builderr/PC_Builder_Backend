import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/user/user.service'
import { AUTH } from 'src/utils/constants'
import { User } from '../../user/entity/user.entity'
import { JwtPayload } from '../interface/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        return this.userService.findById(payload.id)
    }
}
