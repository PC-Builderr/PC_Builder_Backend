import { EntityRepository, Repository } from 'typeorm'
import { FilterObject } from 'src/utils/interface'
import { BadRequestException } from '@nestjs/common'
import { GPU } from './gpu.entity'
import { GPUFilters } from './interface/gpu-filters.interface'

const GPU_FILTER_FIELDS: string[] = [
    'minPrice',
    'maxPrice',
    'brandId',
    'series',
    'memory',
    'memoryType',
    'busWidth',
    'format'
]

@EntityRepository(GPU)
export class GPURepository extends Repository<GPU> {
    getGPUs(filters: string): Promise<GPU[]> {
        const { condition, values }: FilterObject = this.generateFilterObjectFromJSONString(filters)
        return this.createQueryBuilder('gpu')
            .leftJoinAndSelect('gpu.product', 'product')
            .leftJoinAndSelect('product.images', 'image')
            .leftJoinAndSelect('product.brand', 'brand')
            .where(condition, values)
            .getMany()
    }

    private generateFilterObjectFromJSONString(filters: string): FilterObject {
        const filterObject: FilterObject = { condition: '', values: {} }
        if (!filters) return filterObject

        const parsedFilters: GPUFilters = this.parseFilters(filters)

        for (const key in parsedFilters) {
            if (!GPU_FILTER_FIELDS.includes(key)) continue

            let property: string = `gpu.${key} = :${key}`
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
                case 'memory':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    property = `gpu.${key} >= :${key}`
                    break
                case 'busWidth':
                    if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                    break
            }
            if (filterObject.condition) filterObject.condition += ' and '
            filterObject.condition += property
            filterObject.values[key] = parsedFilters[key]
        }
        return filterObject
    }

    private parseFilters(filters: string): GPUFilters {
        try {
            return JSON.parse(filters)
        } catch (error) {
            throw new BadRequestException()
        }
    }
}
