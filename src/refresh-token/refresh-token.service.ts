import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface'

@Injectable()
export class RefreshTokenService {
    constructor(private readonly jwtService: JwtService) {}

    signToken(id: number): string {
        const payload: JwtPayload = { id }
        return this.jwtService.sign(payload)
    }
}
