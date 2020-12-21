import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { BrandModule } from 'src/brand/brand.module'
import { Image } from 'src/image/entity/image.entity'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { ProductRepositry } from './repository/product.repository'

@Module({
    imports: [TypeOrmModule.forFeature([Image, ProductRepositry]), AuthModule, BrandModule],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}
