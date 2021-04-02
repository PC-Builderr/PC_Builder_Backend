import { BadRequestException } from '@nestjs/common'
import { EntityRepository, ObjectLiteral } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { RAM } from '../entity/ram.entity'

const smallerOrEqualFields: string[] = ['capacity', 'speed']

@EntityRepository(RAM)
export class RAMRepository extends FindComponentRepository<RAM> {
    protected createConditionForComponentKey(key: string): string {
        if (key === 'series') {
            return `component.${key} IN (:...${key})`
        }
        if (smallerOrEqualFields.includes(key)) {
            return `component.${key} <= :${key}`
        }
        return super.createConditionForComponentKey(key)
    }
}
