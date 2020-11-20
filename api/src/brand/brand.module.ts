import { Module } from '@nestjs/common'
import { BrandService } from './brand.service'
import { BrandController } from './brand.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Brand } from './brand.entity'
import { Image } from 'src/image/image.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Brand, Image])],
    providers: [BrandService],
    controllers: [BrandController],
    exports: [BrandService]
})
export class BrandModule {}
