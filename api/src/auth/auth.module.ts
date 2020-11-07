import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminModule } from 'src/admin/admin.module'
import { UserModule } from 'src/user/user.module'
import { UserRepository } from 'src/user/user.repository'
import { ONE_HOUR } from 'src/utils/constants'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt-auth.strategy'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: ONE_HOUR
                }
            })
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UserModule,
        AdminModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}

// JwtModule.registerAsync()

// JwtModuleAsyncOptions
