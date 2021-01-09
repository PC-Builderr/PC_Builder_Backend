import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { FindComponent } from 'src/products/components/find-component.interface'
import { GPUFilters } from './gpu-filters'

export class FindGPUDto implements FindComponent<GPUFilters> {
    @ValidateNested()
    @Type(() => GPUFilters)
    filters?: GPUFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
