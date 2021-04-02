import { ArrayMinSize, IsArray, IsPositive, IsString } from 'class-validator'
import { ComponentFilters } from '../../../component-filters'

export class GPUFilters extends ComponentFilters {
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    series?: string

    @IsPositive()
    memory?: number

    @IsString()
    memoryType?: string

    @IsPositive()
    busWidth?: number

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    format?: string[]
}
