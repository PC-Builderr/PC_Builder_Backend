import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductRepository } from './product.repository'
import { ImageModule } from 'src/image/image.module'
import { ImageRepository } from 'src/image/image.repository'
import { UserModule } from 'src/users/user.module'
import { JwtStrategy } from 'src/users/jwt.strategy'

@Module({
    imports: [TypeOrmModule.forFeature([ProductRepository, ImageRepository])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
