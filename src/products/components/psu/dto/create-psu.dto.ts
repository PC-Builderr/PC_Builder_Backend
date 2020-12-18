import { IsBoolean, IsIn, IsPositive, IsString } from 'class-validator'
import { FORMAT_TYPES } from 'src/utils/constants'

export class CreatePSUDto {
    @IsPositive()
    productId: number

    @IsPositive()
    power: number

    @IsPositive()
    efficiency: number

    @IsString()
    certificate: string

    @IsBoolean()
    modular: boolean
}
