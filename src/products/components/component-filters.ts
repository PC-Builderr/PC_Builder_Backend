import { ArrayMinSize, IsArray, IsNumber } from 'class-validator'

export class ComponentFilters {
    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    brand?: number[]

    @IsNumber()
    minPrice?: number

    @IsNumber()
    maxPrice?: number
}
