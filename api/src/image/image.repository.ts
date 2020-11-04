import { EntityRepository, Repository } from 'typeorm'
import { Image } from './image.entity'

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
    async createImages(urls: Array<string>): Promise<Array<Image>> {
        const images: Array<Image> = []
        for (const url of urls) {
            const image: Image = this.create({ url })
            await this.save(image)
            images.push(image)
        }
        return images
    }
}
