import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { PSU } from '../entity/psu.entity'

@EntityRepository(PSU)
export class PSURepository extends FindComponentRepository<PSU> {
    protected createConditionForComponentKey(key: string): string {
        switch (key) {
            case 'power':
                return `component.${key} >= :${key}`
            default:
                return super.createConditionForComponentKey(key)
        }
    }
}

// ['power', 'efficiency']
