import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AdminModule } from 'src/admin/admin.module'
import { AccessTokenConfigService } from 'src/config/access-token-config.service'
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAdminStrategy } from './strategy/jwt-admin.strategy'
import { JwtStrategy } from './strategy/jwt-auth.strategy'
import { RefreshTokenStartegy } from './strategy/refresh-token.strategy'

@Module({
    imports: [
        JwtModule.registerAsync({ useClass: AccessTokenConfigService }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        AdminModule,
        UserModule,
        forwardRef(() => RefreshTokenModule)
    ],
    providers: [AuthService, JwtStrategy, JwtAdminStrategy, RefreshTokenStartegy],
    controllers: [AuthController],
    exports: [JwtStrategy, JwtAdminStrategy, AuthService]
})
export class AuthModule {}
