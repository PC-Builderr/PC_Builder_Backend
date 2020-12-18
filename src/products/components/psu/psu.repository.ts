import { BadRequestException } from '@nestjs/common'
import { EntityRepository, ObjectLiteral } from 'typeorm'
import { ComponentRepository } from '../component.repository'
import { PSU } from './psu.entity'

@EntityRepository(PSU)
export class PSURepository extends ComponentRepository<PSU> {
    protected filterFields: string[] = ['power', 'efficiency', ...this.filterFields]

    protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
        switch (key) {
            case 'power':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                return `component.${key} >= :${key}`
            case 'efficiency':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
            default:
                return super.createConditionForComponentKey(key, parsedFilters)
        }
    }
}
