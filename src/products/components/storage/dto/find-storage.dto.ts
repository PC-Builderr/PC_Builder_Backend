import { StorageFilters } from './filter-storage.dto'

export class FindStorageDto {
    page: number
    count: number
    filters?: StorageFilters
}
