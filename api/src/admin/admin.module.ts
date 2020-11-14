import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtAdminStrategy } from './jwt-admin.strategy'
import { Admin } from './admin.entity'
import { AdminController } from './admin.controller'
import { JwtAdminConfigService } from 'src/config/jwt-admin-config.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin]),
        JwtModule.registerAsync({ useClass: JwtAdminConfigService }),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [AdminService, JwtAdminStrategy],
    controllers: [AdminController],
    exports: [JwtAdminStrategy]
})
export class AdminModule {}
