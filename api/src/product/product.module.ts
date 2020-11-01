import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductRepository } from './product.repository'
import { ImageModule } from 'src/image/image.module'
import { ImageRepository } from 'src/image/image.repository'

@Module({
    imports: [TypeOrmModule.forFeature([ProductRepository, ImageRepository]), ImageModule],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
