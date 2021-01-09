import { IsIn, IsPositive, IsString } from 'class-validator'
import { FORMAT_TYPES } from 'src/utils/constants'
import { ComponentFilters } from '../../component-filters'

export class FilterGPUDto extends ComponentFilters {
    @IsString()
    series: string

    @IsPositive()
    memory: number

    @IsString()
    memoryType: string

    @IsPositive()
    busWidth: number

    @IsIn(Array.from(FORMAT_TYPES.keys()))
    format: string
}
