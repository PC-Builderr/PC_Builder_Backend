import { IsEmail, Matches } from 'class-validator'
import { PASSWORD_REGEX } from 'src/utils/constants'

export class AuthUserDto {
    @IsEmail()
    email: string

    @Matches(PASSWORD_REGEX)
    password: string
}
