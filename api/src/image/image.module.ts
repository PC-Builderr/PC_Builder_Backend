import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageController } from './image.controller'
import { ImageRepository } from './image.repository'
import { ImageService } from './image.service'

@Module({
    imports: [TypeOrmModule.forFeature([ImageRepository])],
    providers: [ImageService],
    controllers: [ImageController]
})
export class ImageModule {}
