import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { Motherboard } from '../entity/motherboard.entity'

@EntityRepository(Motherboard)
export class MotherboardRepository extends FindComponentRepository<Motherboard> {
    protected createConditionForComponentKey(key: string): string {
        switch (key) {
            case 'ramCapacity' || 'ramChannels' || 'm2Port' || 'sataPorts' || 'pciSlots':
                return `component.${key} >= :${key}`
            default:
                return super.createConditionForComponentKey(key)
        }
    }
}
