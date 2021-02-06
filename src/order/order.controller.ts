import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { ORDER_STATUS } from 'src/utils/constants'
import Stripe from 'stripe'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
    constructor(private readonly orderSrvice: OrderService) {}

    @Post('webhook')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateOrderStatusAfterStripeEvent(@Body() event: Stripe.Event, @Req() request: Request) {
        if (event.type === 'charge.expired') {
            this.orderSrvice.chargeExpiredHandler(event)
        }
        if (event.type === 'charge.failed') {
            this.orderSrvice.updateOrderStatus(event, ORDER_STATUS.PAYMENT_FAILED)
        }
        if (event.type === 'charge.succeeded') {
            this.orderSrvice.updateOrderStatus(event, ORDER_STATUS.PAYMENT_SUCCEEDED)
        }
        return
    }
}
