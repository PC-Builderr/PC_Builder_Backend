import { AuthGuard } from '@nestjs/passport'
import { REFRESH_TOKEN } from 'src/utils/constants'

export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN) {}
