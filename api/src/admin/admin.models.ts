import { AuthGuard } from '@nestjs/passport'

export interface JwtAdminPayoad {
    id: number
}

export class AdminJwtGuard extends AuthGuard('Admin') {}
