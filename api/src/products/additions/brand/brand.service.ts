import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brand } from './brand.entity'
import { CreateBrandDto } from './brand.model'
import { BrandRepository } from './brand.repository'

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(BrandRepository)
        private readonly brandRepository: BrandRepository
    ) {}

    async getAllBrands(): Promise<Array<Brand>> {
        const brands: Array<Brand> = await this.brandRepository.find()
        if (!brands.length) throw new NotFoundException()
        return brands
    }

    async getBrandByID(id: number): Promise<Brand> {
        const brand: Brand = await this.brandRepository.findOne(id)
        if (!brand) throw new NotFoundException()
        return brand
    }

    async createBrand(createBrandDto: CreateBrandDto): Promise<void> {
        const { name, link } = createBrandDto
        const brand = await this.brandRepository.findOne({ where: [{ name }, { link }] })
        if (brand) {
            throw new BadRequestException('brand with the provided link or name already exists')
        }
        this.brandRepository.createBrand(createBrandDto)
    }
}
