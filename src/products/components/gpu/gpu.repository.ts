import { EntityRepository, ObjectLiteral } from 'typeorm'
import { BadRequestException } from '@nestjs/common'
import { GPU } from './gpu.entity'
import { ComponentRepository } from '../component.repository'

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
