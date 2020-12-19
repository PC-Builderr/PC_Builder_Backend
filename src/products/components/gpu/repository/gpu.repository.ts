import { BadRequestException } from '@nestjs/common'
import { EntityRepository, ObjectLiteral } from 'typeorm'
import { ComponentRepository } from '../../component.repository'
import { GPU } from '../entity/gpu.entity'

@EntityRepository(GPU)
export class GPURepository extends ComponentRepository<GPU> {
    protected filterFields: string[] = [
        'series',
        'memory',
        'memoryType',
        'busWidth',
        'format',
        ...this.filterFields
    ]

    protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
        switch (key) {
            case 'busWidth' || 'memory':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
            default:
                return super.createConditionForComponentKey(key, parsedFilters)
        }
    }
}
