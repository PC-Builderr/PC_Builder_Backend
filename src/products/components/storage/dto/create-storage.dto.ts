import { IsIn, IsPositive } from 'class-validator'
import { STORAGE_TYPES } from 'src/utils/constants'

export class CreateStorageDto {
    @IsPositive()
    productId: number

    @IsIn(STORAGE_TYPES)
    type: string

    @IsPositive()
    capacity: number

    @IsPositive()
    readSpeed: number

    @IsPositive()
    writeSpeed: number

    @IsPositive()
    consumption: number
}
