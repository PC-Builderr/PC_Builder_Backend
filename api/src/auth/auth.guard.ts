import { AuthGuard } from '@nestjs/passport'

export class AuthJwtGuard extends AuthGuard('Auth') {}
