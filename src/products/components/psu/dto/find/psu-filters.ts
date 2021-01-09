import { IsPositive } from 'class-validator'
import { ComponentFilters } from 'src/products/components/component-filters'

export class PSUFilters extends ComponentFilters {
    @IsPositive()
    power: number

    @IsPositive()
    efficiency: number
}
