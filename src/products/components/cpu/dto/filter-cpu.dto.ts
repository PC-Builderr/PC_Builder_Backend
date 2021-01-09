import { IsArray, IsPositive, IsString, Matches } from 'class-validator'
import { RAM_TYPE } from 'src/utils/constants'
import { ComponentFilters } from '../../component-filters'

export class FilterCPUDto extends ComponentFilters {
    @IsArray()
    @IsString({ each: true })
    generation?: string[]

    @IsArray()
    @IsString({ each: true })
    series?: string[]

    @IsString()
    socket?: string

    @Matches(RAM_TYPE)
    ramType?: string

    @IsPositive()
    ramCapacity?: number

    @IsPositive()
    ramChannels?: number

    @IsString()
    model?: string
}
