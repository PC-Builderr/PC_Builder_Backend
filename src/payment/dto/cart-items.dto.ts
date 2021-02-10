import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { Item } from './item'

export class CartItemsDto {
    @ValidateNested()
    @Type(() => Item)
    @IsArray()
    items: Item[]
}
