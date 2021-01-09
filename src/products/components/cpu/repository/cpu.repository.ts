import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { CPU } from '../entity/cpu.entity'

@EntityRepository(CPU)
export class CPURepository extends FindComponentRepository<CPU> {}
