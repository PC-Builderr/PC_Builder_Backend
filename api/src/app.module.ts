import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from './product/product.module'
import { TypeOrmConfigService } from './config/typeorm-config.service'
import { MulterModule } from '@nestjs/platform-express'
import { ImageModule } from './image/image.module'
import { BrandModule } from './brand/brand.module'
import { UserModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'
import { AdminModule } from './admin/admin.module'
import passport from 'passport'
import { JwtStrategy } from './auth/jwt.strategy'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        }),
        MulterModule.register({
            dest: './uploads'
        }),
        ProductModule,
        ImageModule,
        BrandModule,
        UserModule,
        AuthModule,
        AdminModule
    ]
})
export class AppModule {}
