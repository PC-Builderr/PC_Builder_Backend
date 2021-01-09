import { IsBoolean, IsIn, IsNumber, IsPositive, IsString, Matches } from 'class-validator'
import { FORMAT_TYPES, RAM_TYPE } from 'src/utils/constants'
import { ComponentFilters } from '../../component-filters'

export class FilterMotherboardDto extends ComponentFilters {
    @IsString()
    socket: string

    @IsString()
    chipset: string

    @Matches(RAM_TYPE)
    ramType: string

    @IsPositive()
    ramCapacity: number

    @IsPositive()
    ramChannels: number

    @IsNumber()
    m2Ports: number

    @IsNumber()
    sataPorts: number

    @IsNumber()
    pciSlots: number

    @IsBoolean()
    nvidiaSli: boolean

    @IsBoolean()
    amdCrossfire: boolean

    @IsIn(Array.from(FORMAT_TYPES.keys()))
    format: string
}
