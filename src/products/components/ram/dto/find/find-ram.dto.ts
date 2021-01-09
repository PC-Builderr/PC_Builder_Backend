import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { FindComponent } from 'src/products/components/find-component.interface'
import { RAMFilters } from './ram-filters'

export class FindCaseDto implements FindComponent<RAMFilters> {
    @ValidateNested()
    @Type(() => RAMFilters)
    filters?: RAMFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
