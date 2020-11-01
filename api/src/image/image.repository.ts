import { EntityRepository, Repository } from 'typeorm'
import { Image } from './image.entity'

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
    async createImages(urls: Array<String>): Promise<Array<Image>> {
        const images: Array<Image> = []
        for (const url of urls) {
            const image = new Image()
            image.url = url.toString()
            await image.save()
            images.push(image)
        }
        return images
    }
    
}
