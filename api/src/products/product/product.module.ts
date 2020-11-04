import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageRepository } from 'src/image/image.repository'
import { BrandModule } from 'src/products/additions/brand/brand.module'
import { AuthModule } from 'src/auth/auth.module'
import { CPUModule } from '../components/cpu/cpu.module'
import { Product } from './product.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ImageRepository]),
        BrandModule,
        AuthModule,
        CPUModule
    ],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
