import { IsPositive, IsString, Matches } from 'class-validator'
import { ComponentFilters } from 'src/products/components/component-filters'

export class RAMFilters extends ComponentFilters {
    @IsString()
    type?: string

    @IsPositive()
    speed?: number

    @IsPositive()
    capacity?: number
}
