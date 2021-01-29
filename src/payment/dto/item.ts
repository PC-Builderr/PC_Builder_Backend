import { IsNumber, IsPositive } from 'class-validator'

export class Item {
    @IsPositive()
    id: number
    @IsPositive()
    quantity: number
}
