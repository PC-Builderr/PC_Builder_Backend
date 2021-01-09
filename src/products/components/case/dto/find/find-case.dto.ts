import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { FindComponent } from 'src/products/components/find-component.interface'
import { CaseFilters } from './case-filters'

export class FindCaseDto implements FindComponent<CaseFilters> {
    @ValidateNested()
    @Type(() => CaseFilters)
    filters?: CaseFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
