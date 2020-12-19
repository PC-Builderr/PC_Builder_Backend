import { BadRequestException } from '@nestjs/common'
import { EntityRepository, ObjectLiteral } from 'typeorm'
import { ComponentRepository } from '../../component.repository'
import { Storage } from '../entity/storage.entity'

@EntityRepository(Storage)
export class StorageRepository extends ComponentRepository<Storage> {
    protected filterFields: string[] = ['type', 'capacity', ...this.filterFields]

    protected createConditionForComponentKey(key: string, parsedFilters: ObjectLiteral): string {
        switch (key) {
            case 'capacity':
                if (typeof parsedFilters[key] !== 'number') throw new BadRequestException()
            default:
                return super.createConditionForComponentKey(key, parsedFilters)
        }
    }
}
