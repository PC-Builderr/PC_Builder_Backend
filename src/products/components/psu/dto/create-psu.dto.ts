import { IsPositive } from 'class-validator'

export class CreatePSUDto {
    @IsPositive()
    productId: number

    @IsPositive()
    power: number

    @IsPositive()
    efficiency: number
}
