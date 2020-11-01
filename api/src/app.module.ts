import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from './product/product.module'
import { TypeOrmConfigService } from './config/typeorm-config.service'
import { MulterModule } from '@nestjs/platform-express'
import { ImageModule } from './image/image.module'

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
        ImageModule
    ]
})
export class AppModule {}
