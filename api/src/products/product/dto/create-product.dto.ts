import {
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength
} from 'class-validator'

export class CreateProductDto {
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    name: string

    @IsArray()
    @ArrayNotEmpty()
    images: Array<number>

    @IsNumber()
    brand: number

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description: string

    @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
    price: number
}
