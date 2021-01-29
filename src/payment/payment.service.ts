import { Injectable } from '@nestjs/common'
import { EcontService } from 'src/econt/econt.service'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { ONE_LEV_IN_STOTINKI } from 'src/utils/constants'
import Stripe from 'stripe'
import { Item } from './dto/item'
import { CreatePaymentIntentResponse } from './interface/payment-intent.interface'

@Injectable()
export class PaymentService {
    private readonly stripe: Stripe

    constructor(
        private readonly productService: ProductService,
        private readonly econtService: EcontService
    ) {
        this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, { apiVersion: '2020-08-27' })
    }

    async createPaymentIntent(items: Item[]): Promise<CreatePaymentIntentResponse> {
        const ids: number[] = items.map((item: Item) => item.id)

        const products: Product[] = await this.productService.findByIds(ids)

        const shippingPrice: number = await this.econtService.calculateShipping(products, items)

        const total: number = products.reduce((currentTotal: number, product: Product): number => {
            const item: Item = items.find((item: Item) => item.id === product.id)
            return currentTotal + product.price * item.quantity
        }, 0)

        const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await this.stripe.paymentIntents.create(
            {
                amount: (total + shippingPrice) * ONE_LEV_IN_STOTINKI,
                currency: 'bgn'
            }
        )
        return { clientSecret: paymentIntent.client_secret, shippingPrice }
    }
}
