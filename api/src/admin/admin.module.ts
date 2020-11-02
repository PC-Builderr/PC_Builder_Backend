import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminRepository } from './admin.repository'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtAdminStrategy } from './jwt-admin.strategy'

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminRepository]),
        JwtModule.register({
            secret: 'JWT_ADMIN',
            signOptions: {
                expiresIn: 3600
            }
        }),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [AdminService, JwtAdminStrategy],
    exports: [AdminService, PassportModule, JwtAdminStrategy]
})
export class AdminModule {}
