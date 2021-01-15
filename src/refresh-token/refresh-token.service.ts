import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface'
import { RefreshTokenPayload } from './interface/RefreshTokenPayload'

@Injectable()
export class RefreshTokenService {
    constructor(private readonly jwtService: JwtService) {}

    signToken(payload: RefreshTokenPayload): string {
        return this.jwtService.sign(payload)
    }
}
