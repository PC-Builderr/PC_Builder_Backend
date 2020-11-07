import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './config/typeorm-config.service'
import { MulterModule } from '@nestjs/platform-express'
import { ImageModule } from './image/image.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { AdminModule } from './admin/admin.module'
import { ProductsModule } from './products/products.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        }),
        MulterModule.register({
            dest: './uploads'
        }),
        ImageModule,
        UserModule,
        AuthModule,
        AdminModule,
        ProductsModule
    ]
})
export class AppModule {}
