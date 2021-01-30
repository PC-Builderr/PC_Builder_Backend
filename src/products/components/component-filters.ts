import { ArrayMinSize, IsArray, IsNumber } from 'class-validator'

export class ComponentFilters {
    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    brands?: number[]

    @IsNumber()
    minPrice?: number

    @IsNumber()
    maxPrice?: number
}
