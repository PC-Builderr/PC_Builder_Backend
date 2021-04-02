import { ArrayMinSize, IsArray, IsPositive, IsString, Matches } from 'class-validator'
import { ComponentFilters } from 'src/products/components/component-filters'

export class RAMFilters extends ComponentFilters {
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    series?: string[]

    @IsString()
    type?: string

    @IsPositive()
    speed?: number

    @IsPositive()
    capacity?: number
}
