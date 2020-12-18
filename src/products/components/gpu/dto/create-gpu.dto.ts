import { IsPositive, IsString, Matches } from 'class-validator'
import { GPU_MEM } from 'src/utils/constants'

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

    @IsString()
    format: string

    @IsPositive()
    consumption: number
}
