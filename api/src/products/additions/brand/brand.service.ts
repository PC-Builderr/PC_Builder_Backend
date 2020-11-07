import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { Brand } from './brand.entity'
import { CreateBrandDto } from './dto/create-brand.dto'

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>
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

    async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
        const { name, link } = createBrandDto
        const brand: Brand = await this.brandRepository.findOne({ where: [{ name }, { link }] })
        if (brand) throw new BadRequestException()
        return this.brandRepository.save(brand)
    }
}
