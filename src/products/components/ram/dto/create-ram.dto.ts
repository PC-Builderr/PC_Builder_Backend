import { IsIn, IsPositive, IsString, Matches } from 'class-validator'
import { RAM_CAPACITIES, RAM_TYPE } from 'src/utils/constants'

export class CreateRAMDto {
    @IsPositive()
    productId: number

    @IsString()
    series: string

    @Matches(RAM_TYPE)
    type: string

    @IsPositive()
    voltage: number

    @IsPositive()
    speed: number

    @IsPositive()
    consumption: number

    @IsIn(RAM_CAPACITIES)
    capacity: number
}
