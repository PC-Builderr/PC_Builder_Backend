import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { Product } from './product.entity'
import { Image } from 'src/image/image.entity'
import { BrandModule } from '../additions/brand/brand.module'

@Module({
    imports: [TypeOrmModule.forFeature([Product, Image]), AuthModule, BrandModule],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}
