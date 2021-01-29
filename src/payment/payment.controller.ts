import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import Stripe from 'stripe'
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto'
import { Item } from './dto/item'
import { CreatePaymentIntentResponse } from './interface/payment-intent.interface'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
    private readonly stripe: Stripe

    constructor(private readonly paymentService: PaymentService) {}

    @Post('create-payment-intent')
    async createPaymentIntent(
        @Body(new ValidationPipe()) createPaymentIntentDto: CreatePaymentIntentDto
    ): Promise<CreatePaymentIntentResponse> {
        return this.paymentService.createPaymentIntent(createPaymentIntentDto.items)
    }
}
