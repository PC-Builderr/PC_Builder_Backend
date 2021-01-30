import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { PSU } from '../entity/psu.entity'

@EntityRepository(PSU)
export class PSURepository extends FindComponentRepository<PSU> {
    protected createConditionForComponentKey(key: string): string {
        if (key === 'power') {
            return `component.${key} >= :${key}`
        }
        return super.createConditionForComponentKey(key)
    }
}

// ['power', 'efficiency']
