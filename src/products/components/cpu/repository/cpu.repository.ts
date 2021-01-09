import { BadRequestException } from '@nestjs/common'
import { Product } from 'src/products/product/entity/product.entity'
import { EntityRepository, ObjectLiteral, Repository } from 'typeorm'
import { stringify } from 'uuid'
import { ComponentRepository } from '../../component.repository'
import { FilterCPUDto } from '../dto/filter-cpu.dto'
import { CPU } from '../entity/cpu.entity'

@EntityRepository(CPU)
export class CPURepository extends Repository<CPU> {
    async findFiltered(filterDto: ObjectLiteral): Promise<Product[]> {
        const components: CPU[] = await this.createQueryBuilder('component')
            .leftJoinAndSelect('component.product', 'product')
            .leftJoinAndSelect('product.images', 'image')
            .leftJoinAndSelect('product.brand', 'brand')
            .where(this.generateWhereCondition(filterDto), filterDto)
            .getMany()

        return components.map(cpu => cpu.product)
    }

    private generateWhereCondition(filterCPUDto: FilterCPUDto): string {
        return Object.keys(filterCPUDto).reduce((whereCondition: string, key: string) => {
            const condition: string = this.createConditionForKey(key, filterCPUDto)

            if (!whereCondition) return condition
            return whereCondition + ' and ' + condition
        }, '')
    }

    private createConditionForKey(key: string, parsedFilters: ObjectLiteral): string {
        switch (key) {
            case 'minPrice':
                return 'product.price >= :minPrice'
            case 'maxPrice':
                return 'product.price <= :maxPrice'
            case 'brand':
                return 'brand.id IN (:...brand)'
            default:
                return this.createConditionForComponentKey(key, parsedFilters)
        }
    }

    protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
        return `component.${key} = :${key}`
    }
}

// @EntityRepository(CPU)
// export class CPURepository extends ComponentRepository<CPU> {
//     protected filterFields: string[] = [
//         'generation',
//         'series',
//         'socket',
//         'ramType',
//         'ramCapacity',
//         'ramChannels',
//         'model',
//         ...this.filterFields
//     ]

//     protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
//         switch (key) {
//             case 'ramCapacity' || 'ramChannels':
//                 if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
//                 return `component.${key} >= :${key}`
//             default:
//                 return super.createConditionForComponentKey(key, parsedFilters)
//         }
//     }
// }
