import { IsIn, IsPositive } from 'class-validator'
import { FORMAT_TYPES } from 'src/utils/constants'

export class CreateCaseDto {
    @IsPositive()
    productId: number

    @IsIn(Array.from(FORMAT_TYPES.keys()))
    format: string
}
