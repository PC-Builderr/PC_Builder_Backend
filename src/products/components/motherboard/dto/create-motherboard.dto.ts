import { ArrayMinSize, IsBoolean, IsNotEmpty, IsPositive, IsString, Matches } from 'class-validator'
import { RAM_TYPE } from 'src/utils/constants'

export class CreateMotherboardDto {
    @IsPositive()
    productId: number

    @IsString()
    socket: string

    @IsString()
    chipset: string

    @IsPositive()
    ramCapacity: number

    @IsPositive()
    maxRamSpeed: number

    @IsPositive()
    ramChannels: number

    @Matches(RAM_TYPE)
    ramType: string

    @IsNotEmpty()
    m2Port: number

    @IsPositive()
    sataPort: number

    @IsPositive()
    pciSlots: number

    @IsBoolean()
    nvidiaSli: boolean

    @IsBoolean()
    amdCrossfire: boolean

    @IsString()
    format: string

    @IsPositive()
    tdp: number
}
