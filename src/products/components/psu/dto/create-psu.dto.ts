import { IsBoolean, IsPositive, IsString } from 'class-validator'

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
