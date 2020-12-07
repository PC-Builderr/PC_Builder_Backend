import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AUTH } from 'src/utils/constants'
import { User } from '../user/user.entity'
import { UserRepository } from '../user/user.repository'
import { JwtPayload } from './interface/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH) {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user: User = await this.userRepository.findByEmail(payload.email)
        if (!user) throw new UnauthorizedException()
        return user
    }
}
