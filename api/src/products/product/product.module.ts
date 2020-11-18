import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { Image } from 'src/image/image.entity'
import { BrandModule } from '../../brand/brand.module'
import { ProductRepositry } from './product.repository'

@Module({
    imports: [TypeOrmModule.forFeature([Image, ProductRepositry]), AuthModule, BrandModule],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}
