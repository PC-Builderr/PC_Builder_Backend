import { BadRequestException } from '@nestjs/common'
import { EntityRepository, ObjectLiteral } from 'typeorm'
import { ComponentRepository } from '../component.repository'
import { RAM } from './ram.entity'

@EntityRepository(RAM)
export class RAMRepository extends ComponentRepository<RAM> {
    protected filterFields: string[] = [
        'type',
        'voltage',
        'speed',
        'capacity',
        ...this.filterFields
    ]

    protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
        switch (key) {
            case 'speed' || 'capacity' || 'voltage' || 'quantity':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
            default:
                return super.createConditionForComponentKey(key, parsedFilters)
        }
    }
}
