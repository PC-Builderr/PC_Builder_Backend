import { Matches } from 'class-validator'

export class AuthUserDto {
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    email: string

    @Matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
    password: string
}
