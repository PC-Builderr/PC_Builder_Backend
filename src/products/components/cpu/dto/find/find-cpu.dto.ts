import { IsPositive, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CPUFilters } from './cpu-filters'
import { FindComponent } from 'src/products/components/find-component.interface'

export class FindCPUDto implements FindComponent<CPUFilters> {
    @ValidateNested()
    @Type(() => CPUFilters)
    filters?: CPUFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
