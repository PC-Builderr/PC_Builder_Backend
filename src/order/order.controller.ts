import { Controller, Get, Post } from '@nestjs/common'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
    constructor(private readonly orderSrvice: OrderService) {}

    @Post()
    createOrders(): string {
        return this.orderSrvice.createOrder()
    }
}
