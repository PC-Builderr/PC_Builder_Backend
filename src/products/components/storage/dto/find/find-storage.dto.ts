import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { FindComponent } from '../../../find-component.interface'
import { StorageFilters } from './storage-filters'

export class FindStorageDto implements FindComponent<StorageFilters> {
    @ValidateNested()
    @Type(() => StorageFilters)
    filters?: StorageFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
