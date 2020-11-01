import { ArrayNotEmpty, IsArray, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { Image } from 'src/image/image.entity'

export class CreateProductDto {
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    name: string

    @IsArray()
    @ArrayNotEmpty()
    imageIDs: Array<number>

    @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
    price: number
}
