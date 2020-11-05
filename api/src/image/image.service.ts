import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Image } from './image.entity'

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>
    ) {}

    createImages(files: Array<any>): Promise<Array<Image>> {
        const urls: Array<string> = files.map(({ filename }) => {
            return `/image/${filename}`
        })
        const images: Array<Image> = urls.map(url => this.imageRepository.create({ url }))
        return this.imageRepository.save(images)
    }
}
