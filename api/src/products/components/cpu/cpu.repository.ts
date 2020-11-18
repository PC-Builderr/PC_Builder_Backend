import { EntityRepository, Repository } from 'typeorm'
import { FilterObject } from 'src/utils/interface'
import { CPU } from './cpu.entity'
import { CPU_FILTER_FIELDS } from 'src/utils/constants'

@EntityRepository(CPU)
export class CPURepository extends Repository<CPU> {
    getFillteredCPUs(filters: string): Promise<CPU[]> {
        const { condition, values }: FilterObject = this.generateFilterObjectFromJSONString(filters)
        return this.createQueryBuilder('cpu')
            .innerJoinAndSelect('cpu.product', 'product')
            .innerJoinAndSelect('product.brand', 'brand')
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
                case 'minPrice' || 'maxPrice' || 'ramCapacity' || 'ramChannels' || 'brandId':
                    if (typeof parsedFilters[key] !== 'number') break
                case 'minPrice':
                    property = `product.price >= :${key}`
                    break
                case 'maxPrice':
                    property = `product.price <= :${key}`
                    break
                case 'brandId':
                    property = `brand.id = :${key}`
                    break
                case 'ramCapacity':
                    property = `cpu.${key} >= :${key}`
            }
            if (filterObject.condition) filterObject.condition += ' and '
            filterObject.condition += property
            filterObject.values[key] = parsedFilters[key]
        }
        return filterObject
    }
}
