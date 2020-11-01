import { EntityRepository, Repository } from 'typeorm'
import { Image } from './image.entity'

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
    async createImages(urls: Array<String>): Promise<Array<Image>> {
        const images: Array<Image> = []
        for (const url of urls) {
            const image: Image = new Image()
            image.url = url.toString()
            await this.save(image)
            images.push(image)
        }
        return images
    }
}
