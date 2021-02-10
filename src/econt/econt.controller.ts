import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common'
import { CartItemsDto } from 'src/payment/dto/cart-items.dto'
import { EcontService } from './econt.service'
import { CartItems } from './interface/cart-items.interface'
import { ShippingPriceResponse } from './interface/shipping-price-response.interface'

@Controller('econt')
export class EcontController {
    constructor(private readonly econtService: EcontService) {}

    @Post('calculate')
    async calculateShippingPrice(
        @Body(ValidationPipe) { items }: CartItemsDto
    ): Promise<ShippingPriceResponse> {
        const cartItems: CartItems[] = await this.econtService.getCartItemsFromItems(items)

        const shippingPrice = await this.econtService.calculateShipping(cartItems)

        return { shippingPrice }
    }
}
