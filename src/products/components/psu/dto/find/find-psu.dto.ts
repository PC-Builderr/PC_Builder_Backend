import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { PSUFilters } from './psu-filters'

export class FindCaseDto {
    @ValidateNested()
    @Type(() => PSUFilters)
    filters?: PSUFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
