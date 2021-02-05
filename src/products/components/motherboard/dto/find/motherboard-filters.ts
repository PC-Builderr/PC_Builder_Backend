import {
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsNumber,
    IsPositive,
    IsString,
    Matches
} from 'class-validator'
import { ComponentFilters } from 'src/products/components/component-filters'

export class MotherboardFilters extends ComponentFilters {
    @IsString()
    socket?: string

    @IsString()
    chipset?: string

    @IsString()
    ramType?: string

    @IsPositive()
    ramCapacity?: number

    @IsPositive()
    ramSlots?: number

    @IsPositive()
    maxRamSpeed?: number

    @IsNumber()
    m2Ports?: number

    @IsNumber()
    sataPorts?: number

    @IsNumber()
    pciSlots?: number

    @IsBoolean()
    nvidiaSli?: boolean

    @IsBoolean()
    amdCrossfire?: boolean

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    format?: string[]
}
