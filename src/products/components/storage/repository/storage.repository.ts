import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { Storage } from '../entity/storage.entity'
import { StorageCapacity } from '../interfaces/storage-capacity.interface'
import { StorageType } from '../interfaces/storage-type.interface'

const arrayTypeFields: string[] = ['type', 'capacity', 'series']

@EntityRepository(Storage)
export class StorageRepository extends FindComponentRepository<Storage> {
    protected createConditionForComponentKey(key: string): string {
        if (arrayTypeFields.includes(key)) {
            return `component.${key} IN (:...${key})`
        }
        return super.createConditionForComponentKey(key)
    }

    async findStorageCapacities(): Promise<number[]> {
        const capacities: StorageCapacity[] = await this.createQueryBuilder('storage')
            .select('DISTINCT storage.capacity')
            .getRawMany<StorageCapacity>()

        return capacities.map((c: StorageCapacity) => c.capacity)
    }

    async findStorageTypes(): Promise<string[]> {
        const types: StorageType[] = await this.createQueryBuilder('storage')
            .select('DISTINCT storage.type')
            .getRawMany<StorageType>()

        return types.map((t: StorageType) => t.type)
    }
}
