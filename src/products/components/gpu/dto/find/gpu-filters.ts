import { IsArray, IsPositive, IsString } from 'class-validator'
import { ComponentFilters } from '../../../component-filters'

export class GPUFilters extends ComponentFilters {
    @IsString()
    series?: string

    @IsPositive()
    memory?: number

    @IsString()
    memoryType?: string

    @IsPositive()
    busWidth?: number

    @IsArray()
    @IsString({ each: true })
    format?: string[]
}
