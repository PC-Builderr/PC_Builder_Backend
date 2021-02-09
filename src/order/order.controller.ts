import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards
} from '@nestjs/common'
import { Request } from 'express'
import { request, STATUS_CODES } from 'http'
import { Admin } from 'src/admin/entity/admin.entity'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { AuthorizatedRequest } from 'src/auth/interface/authorizated-request.interface'
import { ORDER_STATUS } from 'src/utils/constants'
import Stripe from 'stripe'
import { Order } from './entity/order.entity'
import { OrderArrayResponse } from './interface/order-array-response.interface'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
    constructor(private readonly orderSrvice: OrderService) {}

    @Post('webhook')
    @HttpCode(HttpStatus.NO_CONTENT)
    async processOrderAfterStripeEvent(@Body() event: Stripe.Event, @Req() request: Request) {
        if (event.type === 'charge.expired') {
            this.orderSrvice.chargeExpiredHandler(event.data.object)
        }
        if (event.type === 'charge.failed') {
            await this.orderSrvice.updateOrder(event, ORDER_STATUS.PAYMENT_FAILED)
        }
        if (event.type === 'charge.succeeded') {
            await this.orderSrvice.updateOrder(event, ORDER_STATUS.PAYMENT_SUCCEEDED)
        }
    }

    @UseGuards(AdminJwtGuard)
    @Get('all')
    getAllOrders(): Promise<OrderArrayResponse> {
        return this.orderSrvice.getAllOrders()
    }

    @UseGuards(AdminJwtGuard)
    @Get('status/payment-succeeded')
    getOrdersWithStatusPaymentSucceeded(): Promise<OrderArrayResponse> {
        return this.orderSrvice.getAvailableOrders(ORDER_STATUS.PAYMENT_SUCCEEDED)
    }

    @UseGuards(AdminJwtGuard)
    @Get('status/shipped')
    getShippedOrders(): Promise<OrderArrayResponse> {
        return this.orderSrvice.getAvailableOrders(ORDER_STATUS.SHIPPED)
    }

    @UseGuards(AdminJwtGuard)
    @Get('status/processing')
    getAdminOrdersForProcess(@Req() request: AuthorizatedRequest): Promise<OrderArrayResponse> {
        return this.orderSrvice.getAvailableOrders(ORDER_STATUS.PROCESSING, request.user.id)
    }

    @UseGuards(AdminJwtGuard)
    @Patch('process')
    processOrder(
        @Body('orderId', ParseIntPipe) orderId: number,
        @Req() request: AuthorizatedRequest
    ) {
        return this.orderSrvice.processOrder(orderId, request.user.id)
    }
}
