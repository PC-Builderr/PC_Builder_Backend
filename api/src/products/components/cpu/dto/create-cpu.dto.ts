import { ArrayMinSize, IsPositive, IsString, Matches } from 'class-validator'
import { RAM_TYPE } from 'src/utils/constants'

export class CreateCPUDto {
    @IsPositive()
    productId: number

    @IsString()
    model: string

    @IsString()
    generation: string

    @IsString()
    series: string

    @IsString()
    socket: string

    @IsPositive()
    core: number

    @IsPositive()
    thread: number

    @IsPositive()
    speed: number

    @IsPositive()
    turboSpeed: number

    @ArrayMinSize(1)
    cache: Array<string>

    @IsPositive()
    ramCapacity: number

    @IsPositive()
    maxRamSpeed: number

    @IsPositive()
    ramChannels: number

    @Matches(RAM_TYPE)
    ramType: string

    @IsPositive()
    tdp: number
}
