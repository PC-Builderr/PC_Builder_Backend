import { ArrayMinSize, IsArray, IsPositive, IsString } from 'class-validator'
import { ComponentFilters } from 'src/products/components/component-filters'

export class PSUFilters extends ComponentFilters {
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    series?: string[]

    @IsPositive()
    power?: number

    @IsPositive()
    efficiency?: number
}
