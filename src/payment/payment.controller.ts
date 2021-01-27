import { Body, Controller, Post } from '@nestjs/common'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { ONE_LEV_IN_STOTINKI } from 'src/utils/constants'
import Stripe from 'stripe'
import { Item } from './interface/item.interface'
import { PaymentIntentResponse } from './interface/payment-intent.interface'

@Controller('payment')
export class PaymentController {
    private readonly stripe: Stripe

    constructor(private readonly productService: ProductService) {
        this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, { apiVersion: '2020-08-27' })
    }

    @Post('create-payment-intent')
    async createPaymentIntent(@Body('items') items: Item[]): Promise<PaymentIntentResponse> {
        const ids: number[] = items.map((item: Item) => item.id)

        const products: Product[] = await this.productService.findByIds(ids)

        const total: number = products.reduce((currentTotal: number, product: Product): number => {
            const item: Item = items.find((item: Item) => item.id === product.id)
            return currentTotal + product.price * item.quantity
        }, 0)

        const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await this.stripe.paymentIntents.create(
            {
                amount: total * ONE_LEV_IN_STOTINKI,
                currency: 'bgn'
            }
        )
        return { clientSecret: paymentIntent.client_secret }
    }
}
