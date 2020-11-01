import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Image } from './image.entity'
import { ImageRepository } from './image.repository'

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageRepository)
        private readonly imageRepository: ImageRepository
    ) {}

    createImages(files): Promise<Array<Image>> {
        const urls = files.map(file => {
            return `/image/${file.filename}`
        })
        return this.imageRepository.createImages(urls)
    }
    getImageById(id: number): Promise<Image> {
        return this.imageRepository.findOne(id)
    }
}
