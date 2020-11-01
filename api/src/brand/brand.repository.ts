import { EntityRepository, Repository } from 'typeorm'
import { Brand } from './brand.entity'
import { CreateBrandDto } from './brand.model'

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {
    createBrand(createBrandDto: CreateBrandDto): void {
        const { name, link } = createBrandDto
        const brand: Brand = new Brand()
        brand.name = name
        brand.link = link
        this.insert(brand)
    }
}
