import { EntityRepository, ObjectLiteral } from 'typeorm'
import { CPU } from './cpu.entity'
import { BadRequestException } from '@nestjs/common'
import { ComponentRepository } from '../abstract-component.repository'

@EntityRepository(CPU)
export class CPURepository extends ComponentRepository<CPU> {
    protected filterFields: string[] = [
        'generation',
        'series',
        'socket',
        'ramType',
        'ramCapacity',
        'ramChannels'
    ]

    protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
        switch (key) {
            case 'ramCapacity':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                return `component.${key} >= :${key}`
            case 'ramChannels':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
            default:
                return null
        }
    }
}
