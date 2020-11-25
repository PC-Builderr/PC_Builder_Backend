import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmConfigService } from './config/typeorm-config.service'
import { ImageModule } from './image/image.module'
import { ProductsModule } from './products/products.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        }),
        MulterModule.register({
            dest: './uploads'
        }),
        UserModule,
        AdminModule,
        AuthModule,
        ProductsModule,
        ImageModule
    ]
})
export class AppModule {}
