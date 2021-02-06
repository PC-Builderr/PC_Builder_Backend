import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthJwtGuard } from 'src/auth/guard/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interface/refresh-token-request.interface'
import Stripe from 'stripe'
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto'
import { Item } from './dto/item'
import { CreatePaymentIntentResponse } from './interface/payment-intent.interface'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
    private readonly stripe: Stripe

    constructor(private readonly paymentService: PaymentService) {}

    @UseGuards(AuthJwtGuard)
    @Post('create-payment-intent')
    async createPaymentIntent(
        @Body(ValidationPipe) createPaymentIntentDto: CreatePaymentIntentDto,
        @Req() req: AuthenticatedRequest
    ): Promise<CreatePaymentIntentResponse> {
        return this.paymentService.createPaymentIntent(createPaymentIntentDto.items, req.user)
    }
}
