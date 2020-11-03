import { AuthGuard } from '@nestjs/passport'

export class AuthJwtGuard extends AuthGuard('Auth') {}

export class RegisterResponse {
    authToken: string
}

export class LoginResponse {
    authToken: string
    adminToken: string | null
}

export interface JwtPayload {
    email: string
}
