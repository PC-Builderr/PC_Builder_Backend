import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtAdminStrategy } from './jwt-admin.strategy'
import { Admin } from './admin.entity'
import { ONE_HOUR } from 'src/utils/constants'

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_ADMIN,
                signOptions: {
                    expiresIn: ONE_HOUR
                }
            })
        }),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [AdminService, JwtAdminStrategy],
    exports: [AdminService, PassportModule, JwtAdminStrategy]
})
export class AdminModule {}
