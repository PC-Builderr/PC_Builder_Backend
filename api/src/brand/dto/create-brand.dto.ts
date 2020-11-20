import { IsPositive, Matches, MaxLength, MinLength } from 'class-validator'
import { LINK_REGEX } from 'src/utils/constants'

export class CreateBrandDto {
    @MinLength(3)
    @MaxLength(25)
    name: string

    @Matches(LINK_REGEX)
    link: string

    @IsPositive()
    imageId: number
}
