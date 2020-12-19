import { MaxLength, MinLength } from 'class-validator'

export class CreateBrandDto {
    @MinLength(1)
    @MaxLength(25)
    name: string
}
