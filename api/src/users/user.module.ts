import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret: 'JWT_SECRET',
            signOptions: {
                expiresIn: 3600
            }
        }),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [UserService, JwtStrategy],
    controllers: [UserController],
    exports: [JwtStrategy, PassportModule]
})
export class UserModule {}
