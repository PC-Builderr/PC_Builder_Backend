import { BadRequestException } from '@nestjs/common'
import { EntityRepository, ObjectLiteral } from 'typeorm'
import { ComponentRepository } from '../component.repository'
import { Motherboard } from './motherboard.entity'

@EntityRepository(Motherboard)
export class MotherboardRepository extends ComponentRepository<Motherboard> {
    protected filterFields: string[] = [
        'socket',
        'chipset',
        'ramType',
        'ramCapacity',
        'ramChannels',
        'm2Ports',
        'sataPorts',
        'pciSlots',
        'nvidiaSli',
        'amdCrossfire',
        'format',
        ...this.filterFields
    ]

    protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
        switch (key) {
            case 'ramCapacity' || 'ramChannels' || 'm2Port' || 'sataPorts' || 'pciSlots':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
                return `component.${key} >= :${key}`
            case 'nvidiaSli' || 'amdCrossfire':
                if (typeof parsedFilters[key] !== 'boolean') throw new BadRequestException()
            default:
                return super.createConditionForComponentKey(key, parsedFilters)
        }
    }
}
