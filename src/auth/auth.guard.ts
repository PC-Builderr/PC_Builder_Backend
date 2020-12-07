import { AuthGuard } from '@nestjs/passport'
import { AUTH } from 'src/utils/constants'

export class AuthJwtGuard extends AuthGuard(AUTH) {}
