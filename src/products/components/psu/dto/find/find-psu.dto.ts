import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { FindComponent } from 'src/products/components/find-component.interface'
import { PSUFilters } from './psu-filters'

export class FindPSUDto implements FindComponent<PSUFilters> {
    @ValidateNested()
    @Type(() => PSUFilters)
    filters?: PSUFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
