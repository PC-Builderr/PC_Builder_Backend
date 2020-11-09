import { ArrayNotEmpty, IsIn, IsNumber, MaxLength, MinLength } from 'class-validator'
import { COMPONENT_TYPES } from 'src/utils/constants'

export class CreateProductDto {
    @MinLength(5)
    @MaxLength(40)
    name: string

    @ArrayNotEmpty()
    imagesId: Array<number>

    @IsNumber()
    brandId: number

    @MinLength(10)
    description: string

    @IsNumber()
    price: number

    @IsIn(COMPONENT_TYPES)
    type: string
}
