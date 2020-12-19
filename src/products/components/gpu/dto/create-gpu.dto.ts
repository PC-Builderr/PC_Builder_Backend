import { IsIn, IsPositive, IsString, Matches } from 'class-validator'
import { FORMAT_TYPES, GPU_MEM } from 'src/utils/constants'

export class CreateGPUDto {
    @IsPositive()
    productId: number

    @IsString()
    series: string

    @IsPositive()
    speed: number

    @IsPositive()
    memory: number

    @Matches(GPU_MEM)
    memoryType: string

    @IsPositive()
    busWidth: number

    @IsIn(Array.from(FORMAT_TYPES.keys()))
    format: string

    @IsPositive()
    consumption: number
}
