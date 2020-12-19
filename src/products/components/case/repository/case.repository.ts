import { EntityRepository } from 'typeorm'
import { ComponentRepository } from '../../component.repository'
import { Case } from '../entity/case.entity'

@EntityRepository(Case)
export class CaseRepository extends ComponentRepository<Case> {
    protected filterFields: string[] = ['format', ...this.filterFields]
}