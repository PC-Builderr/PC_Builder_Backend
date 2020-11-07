import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { Image } from './image.entity'

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>
    ) {}

    createImages(files: Array<any>): Promise<Array<Image>> {
        const images: Array<DeepPartial<Image>> = files.map(({ filename }) => {
            return { url: `/image/${filename}` }
        })
        return this.imageRepository.save(images)
    }
}
