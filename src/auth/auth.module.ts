import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AdminModule } from 'src/admin/admin.module'
import { JwtConfigService } from 'src/config/jwt-config.service'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAdminStrategy } from './strategy/jwt-admin.strategy'
import { JwtStrategy } from './strategy/jwt-auth.strategy'

@Module({
    imports: [
        JwtModule.registerAsync({ useClass: JwtConfigService }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        AdminModule,
        UserModule
    ],
    providers: [AuthService, JwtStrategy, JwtAdminStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy, JwtAdminStrategy]
})
export class AuthModule {}
