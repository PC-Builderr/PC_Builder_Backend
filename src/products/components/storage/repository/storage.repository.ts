import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { Storage } from '../entity/storage.entity'

@EntityRepository(Storage)
export class StorageRepository extends FindComponentRepository<Storage> {}
