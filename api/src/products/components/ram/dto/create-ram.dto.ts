import { IsIn, IsPositive, Matches } from 'class-validator'
import { RAM_CAPACITIES, RAM_TYPE } from 'src/utils/constants'

export class CreateRAMDto {
    @IsPositive()
    prodctId: number

    @Matches(RAM_TYPE)
    type: string

    @IsPositive()
    voltage: number

    @IsPositive()
    speed: number

    @IsPositive()
    tdp: number

    @IsIn(RAM_CAPACITIES)
    capacity: number
}
