import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { Storage } from '../entity/storage.entity'

const arrayTypeFields: string[] = ['type', 'capacity']

@EntityRepository(Storage)
export class StorageRepository extends FindComponentRepository<Storage> {
    protected createConditionForComponentKey(key: string): string {
        if (arrayTypeFields.includes(key)) {
            return `component.${key} IN (:...${key})`
        }
        return super.createConditionForComponentKey(key)
    }
}
