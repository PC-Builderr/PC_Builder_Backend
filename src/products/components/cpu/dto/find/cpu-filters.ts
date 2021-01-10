import { IsArray, IsBoolean, IsPositive, IsString, Matches } from 'class-validator'
import { RAM_TYPE } from 'src/utils/constants'
import { ComponentFilters } from '../../../component-filters'

export class CPUFilters extends ComponentFilters {
    @IsArray()
    @IsString({ each: true })
    generation?: string[]

    @IsArray()
    @IsString({ each: true })
    series?: string[]

    @IsArray()
    @IsString({ each: true })
    socket?: string[]

    @Matches(RAM_TYPE)
    ramType?: string

    @IsPositive()
    ramCapacity?: number

    @IsPositive()
    ramChannels?: number

    @IsBoolean()
    integratedGraphics?: boolean
}
