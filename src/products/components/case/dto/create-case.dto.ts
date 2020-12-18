import { IsIn, IsPositive, validate } from 'class-validator'
import { FORMAT_TYPES } from 'src/utils/constants'

export class CreateCaseDto {
    @IsPositive()
    productId: number

    @IsIn(FORMAT_TYPES)
    format: string
}

const c: CreateCaseDto = {
    productId: 1,
    format: 'atx'
}
