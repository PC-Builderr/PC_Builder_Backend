import { AuthGuard } from '@nestjs/passport'

export class AuthJwtGuard extends AuthGuard('Auth') {}

export class JwtResponse {
    token: string
}

export interface JwtPayload {
    email: string
}
