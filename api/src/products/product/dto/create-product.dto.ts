import { ArrayNotEmpty, IsIn, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { COMPONENT_TYPES } from 'src/utils/constants'

export class CreateProductDto {
    @MinLength(5)
    @MaxLength(40)
    name: string

    @ArrayNotEmpty()
    imagesId: number[]

    @IsString()
    brand: string

    @MinLength(10)
    description: string

    @IsNumber()
    price: number

    @IsIn(COMPONENT_TYPES)
    type: string
}
