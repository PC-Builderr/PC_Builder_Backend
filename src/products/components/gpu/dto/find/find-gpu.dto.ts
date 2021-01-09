import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { GPUFilters } from './gpu-filters'

export class FindGPUDto {
    @ValidateNested()
    @Type(() => GPUFilters)
    filters?: GPUFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
