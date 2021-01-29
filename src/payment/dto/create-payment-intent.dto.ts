import { Type } from 'class-transformer'
import { IsArray, MinLength, ValidateNested } from 'class-validator'
import { Item } from './item'

export class CreatePaymentIntentDto {
    @ValidateNested()
    @Type(() => Item)
    @IsArray()
    items: Item[]
}
