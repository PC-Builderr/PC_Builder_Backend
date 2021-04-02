import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator'
import { ComponentFilters } from '../../../component-filters'

export class StorageFilters extends ComponentFilters {
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    series?: string[]

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    type?: string[]

    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    capacity?: number[]
}
