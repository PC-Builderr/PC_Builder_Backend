import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateBrandDto } from './dto/create-brand.dto'
import { Brand } from './entity/brand.entity'
import { BrandRepository } from './repository/brand.repository'

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: BrandRepository
    ) {}

    async find(type: string): Promise<Brand[]> {
        const brands: Brand[] = type
            ? await this.brandRepository.findByProductType(type)
            : await this.brandRepository.find()

        if (!brands.length) {
            throw new NotFoundException()
        }

        return brands
    }

    async findById(id: number): Promise<Brand> {
        const brand: Brand = await this.brandRepository.findOne(id)

        if (!brand) {
            throw new NotFoundException()
        }

        return brand
    }

    async create(createBrandDto: CreateBrandDto): Promise<Brand> {
        const { name } = createBrandDto
        const brand: Brand = await this.brandRepository.findOne({
            where: [{ name }]
        })

        if (brand) {
            throw new BadRequestException()
        }

        const newBrand: Brand = this.brandRepository.create(createBrandDto)

        return this.brandRepository.save(newBrand)
    }
}
