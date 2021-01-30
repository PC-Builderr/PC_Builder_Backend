import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { CPU } from '../entity/cpu.entity'

const biggerOrEqualFields: string[] = ['ramCapacity', 'ramChannels', 'maxRamSpeed']

@EntityRepository(CPU)
export class CPURepository extends FindComponentRepository<CPU> {
    protected createConditionForComponentKey(key: string): string {
        if (biggerOrEqualFields.includes(key)) {
            return `component.${key} >= :${key}`
        }
        return super.createConditionForComponentKey(key)
    }
}
