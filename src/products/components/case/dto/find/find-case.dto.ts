import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { CaseFilters } from './case-filters'

export class FindCaseDto {
    @ValidateNested()
    @Type(() => CaseFilters)
    filters?: CaseFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
