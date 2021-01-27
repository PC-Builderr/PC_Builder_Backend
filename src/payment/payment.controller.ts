import { Controller, Post } from '@nestjs/common'
import Stripe from 'stripe'
import { PaymentIntentResponse } from './interface/payment-intent.interface'

@Controller('payment')
export class PaymentController {
    stripe: Stripe

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, { apiVersion: '2020-08-27' })
    }

    @Post('create-payment-intent')
    async createPaymentIntent(): Promise<PaymentIntentResponse> {
        const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await this.stripe.paymentIntents.create(
            {
                amount: 1400,
                currency: 'bgn'
            }
        )
        console.log(paymentIntent)
        return { clientSecret: paymentIntent.client_secret }
    }
}
