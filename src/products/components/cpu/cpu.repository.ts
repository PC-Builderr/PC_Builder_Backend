import { EntityRepository, Repository } from 'typeorm'
import { FilterObject } from 'src/utils/interface'
import { CPU } from './cpu.entity'
import { CPUFilters } from './interface/cpu-filters.interface'
import { BadRequestException } from '@nestjs/common'

const CPU_FILTER_FIELDS: string[] = [
    'minPrice',
    'maxPrice',
    'brandId',
    'generation',
    'series',
    'socket',
    'ramType',
    'ramCapacity',
    'ramChannels'
]

@EntityRepository(CPU)
export class CPURepository extends Repository<CPU> {
    getCPUs(filters: string): Promise<CPU[]> {
        const { condition, values }: FilterObject = this.generateFilterObjectFromJSONString(filters)
        return this.createQueryBuilder('cpu')
            .leftJoinAndSelect('cpu.product', 'product')
            .leftJoinAndSelect('product.images', 'image')
            .leftJoinAndSelect('product.brand', 'brand')
            .where(condition, values)
            .getMany()
    }

    private generateFilterObjectFromJSONString(filters: string): FilterObject {
        const filterObject: FilterObject = { condition: '', values: {} }
        if (!filters) return filterObject

        const parsedFilters: CPUFilters = JSON.parse(filters)

        for (const key in parsedFilters) {
            if (!CPU_FILTER_FIELDS.includes(key)) continue

            let property: string = `cpu.${key} = :${key}`
            switch (key) {
                case 'minPrice':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    property = `product.price >= :${key}`
                    break
                case 'maxPrice':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    property = `product.price <= :${key}`
                    break
                case 'brandId':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    property = `brand.id = :${key}`
                    break
                case 'ramCapacity':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    property = `cpu.${key} >= :${key}`
                    break
                case 'ramChannels':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    break
            }
            if (filterObject.condition) filterObject.condition += ' and '
            filterObject.condition += property
            filterObject.values[key] = parsedFilters[key]
        }
        return filterObject
    }
}
