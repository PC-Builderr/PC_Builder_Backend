import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductRepository } from './product.repository'
import { ImageRepository } from 'src/image/image.repository'
import { BrandModule } from 'src/brand/brand.module'
import { AdminModule } from 'src/admin/admin.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductRepository, ImageRepository]),
        BrandModule,
        AuthModule
    ],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
