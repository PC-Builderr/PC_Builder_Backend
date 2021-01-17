import { IsNumber, IsString } from 'class-validator'

export class UserDetails {
    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsString()
    email: string
}
