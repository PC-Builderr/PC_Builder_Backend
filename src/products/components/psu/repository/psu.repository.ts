import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { PSU } from '../entity/psu.entity'

@EntityRepository(PSU)
export class PSURepository extends FindComponentRepository<PSU> {
    protected createConditionForComponentKey(key: string): string {
        if (key === 'series') {
            return `component.${key} IN (:...${key})`
        }
        if (key === 'power') {
            return `component.power * component.efficiency / 100 >= :${key}`
        }
        return super.createConditionForComponentKey(key)
    }
}
