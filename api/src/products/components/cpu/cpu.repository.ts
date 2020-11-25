import { EntityRepository, Repository } from 'typeorm'
import { FilterObject } from 'src/utils/interface'
import { CPU } from './cpu.entity'
import { CPUFilters } from './interface/cpu-filters.interface'

const CPU_FILTER_FIELDS: string[] = [
    'minPrice',
    'maxPrice',
    'brand',
    'generation',
    'series',
    'socket',
    'ramType',
    'ramCapacity',
    'ramChannels'
]

@EntityRepository(CPU)
export class CPURepository extends Repository<CPU> {
    getFillteredCPUs(filters: string): Promise<CPU[]> {
        const { condition, values }: FilterObject = this.generateFilterObjectFromJSONString(filters)
        return this.createQueryBuilder('cpu')
            .innerJoinAndSelect('cpu.product', 'product')
            .innerJoinAndSelect('product.images', 'image')
            .where(condition, values)
            .getMany()
    }

    private generateFilterObjectFromJSONString(filters: string): FilterObject {
        const parsedFilters: CPUFilters = JSON.parse(filters)
        const filterObject: FilterObject = { condition: '', values: {} }
        for (const key in parsedFilters) {
            if (!CPU_FILTER_FIELDS.includes(key)) continue
            let property: string = `cpu.${key} = :${key}`
            switch (key) {
                case 'minPrice' || 'maxPrice' || 'ramCapacity' || 'ramChannels':
                    if (typeof parsedFilters[key] !== 'number') break
                case 'minPrice':
                    property = `product.price >= :${key}`
                    break
                case 'maxPrice':
                    property = `product.price <= :${key}`
                    break
                case 'brand':
                    property = `product.brand = :${key}`
                    break
                case 'ramCapacity':
                    property = `cpu.${key} >= :${key}`
                    break
            }
            if (filterObject.condition) filterObject.condition += ' and '
            filterObject.condition += property
            filterObject.values[key] = parsedFilters[key]
        }
        return filterObject
    }
}
