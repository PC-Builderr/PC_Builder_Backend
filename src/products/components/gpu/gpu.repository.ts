import { EntityRepository, ObjectLiteral } from 'typeorm'
import { BadRequestException } from '@nestjs/common'
import { GPU } from './gpu.entity'
import { ComponentRepository } from '../abstract-component.repository'

@EntityRepository(GPU)
export class GPURepository extends ComponentRepository<GPU> {
    protected filterFields: string[] = ['series', 'memory', 'memoryType', 'busWidth', 'format']

    protected createConditionForComponentKey(
        key: string,
        parsedFilters: ObjectLiteral
    ): string | null {
        switch (key) {
            case 'memory':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                return `component.${key} >= :${key}`
            case 'busWidth':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
            default:
                return null
        }
    }
}
