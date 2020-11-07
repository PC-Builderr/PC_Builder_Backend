import { AuthGuard } from '@nestjs/passport'
import { ADMIN } from 'src/utils/constants';

export class AdminJwtGuard extends AuthGuard(ADMIN) {}
