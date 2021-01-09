import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { Case } from '../entity/case.entity'

@EntityRepository(Case)
export class CaseRepository extends FindComponentRepository<Case> {}
