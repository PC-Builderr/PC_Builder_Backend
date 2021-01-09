import { IsArray, IsNumber, IsPositive, IsString, Matches } from 'class-validator'
import { FilterComponentDto } from '../../filter-component.dto'
import { RAM_TYPE } from 'src/utils/constants'

export class FilterCPUDto extends FilterComponentDto {
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
