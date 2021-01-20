import { ArrayNotEmpty, IsIn, IsNumber, IsString, MinLength } from 'class-validator'
import { COMPONENT_TYPES } from 'src/utils/constants'

export class CreateProductDto {
    @MinLength(5)
    name: string

    @IsString()
    metaData: string

    @ArrayNotEmpty()
    imagesId: number[]

    @IsNumber()
    brandId: number

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsIn(COMPONENT_TYPES)
    type: string
}
