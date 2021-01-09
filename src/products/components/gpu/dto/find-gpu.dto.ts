import { Type } from 'class-transformer'
import { IsPositive, ValidateNested } from 'class-validator'
import { FilterGPUDto } from './filter-gpu.dto'

export class FindGPUDto {
    @ValidateNested()
    @Type(() => FilterGPUDto)
    filters?: FilterGPUDto

    @IsPositive()
    page: number

    @IsPositive()
    count: number
}
