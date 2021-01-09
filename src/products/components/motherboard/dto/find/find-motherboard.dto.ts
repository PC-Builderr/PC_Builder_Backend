import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { MotherboardFilters } from './motherboard-filters'

export class FindMotherboardDto {
    @ValidateNested()
    @Type(() => MotherboardFilters)
    filters?: MotherboardFilters

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
