import { Matches } from 'class-validator'
import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/utils/constants'

export class AuthUserDto {
    @Matches(EMAIL_REGEX)
    email: string

    @Matches(PASSWORD_REGEX)
    password: string
}
