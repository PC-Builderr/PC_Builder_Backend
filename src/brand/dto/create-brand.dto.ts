import { MaxLength, MinLength } from 'class-validator'

export class CreateBrandDto {
    @MinLength(3)
    @MaxLength(25)
    name: string
}
