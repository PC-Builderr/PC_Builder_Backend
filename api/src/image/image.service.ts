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

    createImages(files: Array<any>): Promise<Array<Image>> {
        const urls: Array<String> = files.map(({ filename }) => {
            return `/image/${filename}`
        })
        return this.imageRepository.createImages(urls)
    }
}
