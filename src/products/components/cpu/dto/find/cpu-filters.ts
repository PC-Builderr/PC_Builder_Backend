import { ArrayMinSize, IsArray, IsBoolean, IsPositive, IsString, Matches } from 'class-validator'
import { RAM_TYPE } from 'src/utils/constants'
import { ComponentFilters } from '../../../component-filters'

export class CPUFilters extends ComponentFilters {
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    generation?: string[]

    @IsArray()
    @ArrayMinSize(1)
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

    @IsPositive()
    maxRamSpeed?: number

    @IsBoolean()
    integratedGraphics?: boolean
}
