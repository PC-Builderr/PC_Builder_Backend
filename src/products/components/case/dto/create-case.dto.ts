import { IsIn, IsPositive } from 'class-validator'
import { FORMAT_TYPES } from 'src/utils/constants'

export class CreateCaseDto {
    @IsPositive()
    productId: number

    @IsIn(Object.keys(FORMAT_TYPES))
    format: string
}
