import { IsIn, IsPositive, IsString, Matches } from 'class-validator'
import { FORMAT_TYPES } from 'src/utils/constants'

export class CreateGPUDto {
    @IsPositive()
    productId: number

    @IsString()
    series: string

    @IsPositive()
    speed: number

    @IsPositive()
    memory: number

    @IsString()
    memoryType: string

    @IsPositive()
    busWidth: number

    @IsIn(Array.from(FORMAT_TYPES.keys()))
    format: string

    @IsPositive()
    consumption: number
}
