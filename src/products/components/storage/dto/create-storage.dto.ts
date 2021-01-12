import { IsIn, IsPositive, IsString } from 'class-validator'
import { STORAGE_TYPES } from 'src/utils/constants'

export class CreateStorageDto {
    @IsPositive()
    productId: number

    @IsString()
    series: string

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
