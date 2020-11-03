import {
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength
} from 'class-validator'
import { Interface } from 'readline'
import { Brand } from 'src/products/additions/brand/brand.entity'
import { Image } from 'src/image/image.entity'
import { Product } from './product.entity'

export class CreateProductDto {
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    name: string

    @IsArray()
    @ArrayNotEmpty()
    images: Array<Image>

    @IsNotEmpty()
    brand: Brand

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description: string

    @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
    price: number
}
export class CreateProductBody {
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
export class ProductResponse {
    product: Product
}
export class ProductArrayResponse {
    products: Array<Product>
}
