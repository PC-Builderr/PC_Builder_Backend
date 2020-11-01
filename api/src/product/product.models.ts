import { ArrayNotEmpty, IsArray, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { Product } from './product.entity'

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
export class ProductResponse {
    product: Product
}
export class ProductArrayResponse {
    products: Array<Product>
}
