import { Matches, MinLength } from 'class-validator'
import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/utils/constants'

export class CreateUserDto {
    @MinLength(2)
    name: string

    @Matches(EMAIL_REGEX)
    email: string

    @Matches(PASSWORD_REGEX)
    password: string
}
