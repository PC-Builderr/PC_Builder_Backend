import { IsMobilePhone, IsPostalCode, IsString, Min, MinLength } from 'class-validator'

export class CreateShippingAddressDto {
    @IsMobilePhone()
    phone: string

    @IsString()
    @MinLength(2)
    name: string

    @IsString()
    @MinLength(2)
    city: string

    @IsString()
    @MinLength(5)
    address: string

    @IsString()
    postCode: string
}
