import { EntityRepository } from 'typeorm'
import { ComponentRepository } from '../abstract-component.repository'
import { Case } from './case.entity'

@EntityRepository(Case)
export class CaseRepository extends ComponentRepository<Case> {
    protected filterFields: string[] = ['format']

    protected createConditionForComponentKey(): null {
        return null
    }
}
