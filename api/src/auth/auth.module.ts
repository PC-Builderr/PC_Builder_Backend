import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtConfigService } from 'src/config/jwt-config.service'
import { UserModule } from 'src/user/user.module'
import { UserRepository } from 'src/user/user.repository'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt-auth.strategy'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.registerAsync({ useClass: JwtConfigService }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UserModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy]
})
export class AuthModule {}
