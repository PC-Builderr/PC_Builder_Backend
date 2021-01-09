import { IsPositive, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CPUFilters } from './cpu-filters'

export class FindCPUDto {
    @ValidateNested()
    @Type(() => CPUFilters)
    filters?: CPUFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
