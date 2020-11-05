import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandModule } from 'src/products/additions/brand/brand.module'
import { AuthModule } from 'src/auth/auth.module'
import { CPUModule } from '../components/cpu/cpu.module'
import { Product } from './product.entity'
import { Image } from 'src/image/image.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Product, Image]), BrandModule, AuthModule, CPUModule],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
