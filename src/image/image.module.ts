import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from './entity/image.entity'
import { ImageController } from './image.controller'
import { ImageService } from './image.service'

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    providers: [ImageService],
    controllers: [ImageController]
})
export class ImageModule {}
