import { IsPositive, IsString } from 'class-validator'

export class CreateRAMDto {
    @IsPositive()
    productId: number

    @IsString()
    series: string

    @IsString()
    type: string

    @IsPositive()
    voltage: number

    @IsPositive()
    speed: number

    @IsPositive()
    consumption: number

    @IsPositive()
    capacity: number
}
