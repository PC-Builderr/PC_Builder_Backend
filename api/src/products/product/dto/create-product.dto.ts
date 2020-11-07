import { ArrayNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator'

export class CreateProductDto {
    @MinLength(5)
    @MaxLength(20)
    name: string

    @ArrayNotEmpty()
    imagesId: Array<number>

    @IsNumber()
    brandId: number

    @MinLength(10)
    description: string

    @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
    price: number
}
