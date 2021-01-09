import { IsPositive, Matches } from 'class-validator'
import { ComponentFilters } from 'src/products/components/component-filters'
import { RAM_TYPE } from 'src/utils/constants'

export class RAMFilters extends ComponentFilters {
    @Matches(RAM_TYPE)
    type: string

    @IsPositive()
    voltage: number

    @IsPositive()
    speed: number

    @IsPositive()
    capacity: number
}
