import { IsArray, IsIn, IsNumber, Matches } from 'class-validator'
import { STORAGE_TYPES } from 'src/utils/constants'
import { ComponentFilters } from '../../../component-filters'

export class StorageFilters extends ComponentFilters {
    @IsIn(STORAGE_TYPES)
    type: string

    @IsArray()
    @IsNumber({}, { each: true })
    capacity: number[]
}
