import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { Motherboard } from '../entity/motherboard.entity'

const biggerOrEqualFields: string[] = [
    'ramCapacity',
    'ramSlots',
    'm2Ports',
    'sataPorts',
    'pciSlots',
    'maxRamSpeed'
]

@EntityRepository(Motherboard)
export class MotherboardRepository extends FindComponentRepository<Motherboard> {
    protected createConditionForComponentKey(key: string): string {
        if (biggerOrEqualFields.includes(key)) {
            return `component.${key} >= :${key}`
        }
        if (key === 'format') {
            return `component.${key} IN (:...${key})`
        }
        return super.createConditionForComponentKey(key)
    }
}
