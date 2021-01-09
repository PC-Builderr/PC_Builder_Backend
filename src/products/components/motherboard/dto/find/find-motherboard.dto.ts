import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { FindComponent } from 'src/products/components/find-component.interface'
import { MotherboardFilters } from './motherboard-filters'

export class FindMotherboardDto implements FindComponent<MotherboardFilters> {
    @ValidateNested()
    @Type(() => MotherboardFilters)
    filters?: MotherboardFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
