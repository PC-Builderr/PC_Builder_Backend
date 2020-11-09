import { ArrayMinSize, IsPositive, IsString, Matches } from 'class-validator'
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

    @ArrayMinSize(1)
    ports: Array<string>

    @IsString()
    format: string

    @IsPositive()
    tdp: number
}
