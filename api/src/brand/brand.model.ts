import { IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { Brand } from './brand.entity'

export class CreateBrandDto {
    @IsString()
    @MinLength(3)
    @MaxLength(25)
    name: string

    @Matches(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
    link: string
}
export class BrandResponse {
    brand: Brand
}
export class BrandArrayResponse {
    brands: Array<Brand>
}
