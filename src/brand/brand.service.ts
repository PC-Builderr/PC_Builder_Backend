import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateBrandDto } from './dto/create-brand.dto'
import { Brand } from './entity/brand.entity'

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>
    ) {}

    async find(): Promise<Brand[]> {
        const brands: Brand[] = await this.brandRepository.find({
            cache: { id: 'brand:find', milliseconds: 10000 }
        })
        if (!brands.length) throw new NotFoundException('No Brands Found')
        return brands
    }

    async findById(id: number): Promise<Brand> {
        const brand: Brand = await this.brandRepository.findOne(id)
        if (!brand) throw new NotFoundException('Brand Not Found')
        return brand
    }

    async create(createBrandDto: CreateBrandDto): Promise<Brand> {
        const { name } = createBrandDto
        const brand: Brand = await this.brandRepository.findOne({
            where: [{ name }]
        })
        if (brand) throw new BadRequestException('Brand Already Exists')
        const newBrand: Brand = this.brandRepository.create(createBrandDto)
        return this.brandRepository.save(newBrand)
    }
}
