import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { FilterMotherboardDto } from './filter-motherboard.dto'

export class FindMotherboardDto {
    @ValidateNested()
    @Type(() => FilterMotherboardDto)
    filters?: FilterMotherboardDto

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
