import { EntityRepository, Repository } from 'typeorm'
import { Brand } from './brand.entity'
import { CreateBrandDto } from './brand.model'

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {
    createBrand(createBrandDto: CreateBrandDto): void {
        const brand: Brand = this.create(createBrandDto)
        this.insert(brand)
    }
}
