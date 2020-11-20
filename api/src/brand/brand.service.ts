import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Image } from 'src/image/image.entity'
import { Repository } from 'typeorm'
import { Brand } from './brand.entity'
import { CreateBrandDto } from './dto/create-brand.dto'

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>
    ) {}

    async getAllBrands(): Promise<Brand[]> {
        const brands: Brand[] = await this.brandRepository.find()
        if (!brands.length) throw new NotFoundException()
        return brands
    }

    async getBrandByID(id: number): Promise<Brand> {
        const brand: Brand = await this.brandRepository.findOne(id)
        if (!brand) throw new NotFoundException()
        return brand
    }

    async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
        const { name, link, imageId } = createBrandDto
        const image: Image = await this.imageRepository.findOne(imageId)
        const brand: Brand = await this.brandRepository.findOne({
            where: [{ name }, { link }, { image }]
        })
        if (brand) throw new BadRequestException()
        const newBrand: Brand = this.brandRepository.create({ ...createBrandDto, image })
        return this.brandRepository.save(newBrand)
    }
}
