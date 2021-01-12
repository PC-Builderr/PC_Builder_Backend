import { IsIn, IsPositive, IsString } from 'class-validator'
import { FORMAT_TYPES } from 'src/utils/constants'

export class CreateCaseDto {
    @IsPositive()
    productId: number

    @IsString()
    series: string

    @IsIn(Array.from(FORMAT_TYPES.keys()))
    format: string
}
