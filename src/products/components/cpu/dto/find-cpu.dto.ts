import { IsPositive, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { FilterCPUDto } from './filter-cpu.dto'

export class FindCPUDto {
    @ValidateNested()
    @Type(() => FilterCPUDto)
    filters?: FilterCPUDto

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
