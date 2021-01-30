import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { Case } from '../entity/case.entity'

@EntityRepository(Case)
export class CaseRepository extends FindComponentRepository<Case> {
    protected createConditionForComponentKey(key: string): string {
        if (key === 'format') {
            return `component.${key} IN (:...${key})`
        }
        return super.createConditionForComponentKey(key)
    }
}
