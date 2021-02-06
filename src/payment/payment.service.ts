import { Injectable } from '@nestjs/common'
import { EcontService } from 'src/econt/econt.service'
import { Order } from 'src/order/entity/order.entity'
import { OrderService } from 'src/order/order.service'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { User } from 'src/user/entity/user.entity'
import { ONE_LEV_IN_STOTINKI } from 'src/utils/constants'
import Stripe from 'stripe'
import { Item } from './dto/item'
import { CreatePaymentIntentResponse } from './interface/payment-intent.interface'

@Injectable()
export class PaymentService {
    private readonly stripe: Stripe

    constructor(private readonly orderService: OrderService) {
        this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, { apiVersion: '2020-08-27' })
    }

    async createPaymentIntent(items: Item[], user: User): Promise<CreatePaymentIntentResponse> {
        const order: Order = await this.orderService.createOrder(items, user)

        const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await this.stripe.paymentIntents.create(
            {
                amount: order.total * ONE_LEV_IN_STOTINKI,
                currency: 'bgn',
                receipt_email: user.email,
                metadata: {
                    orderId: order.id
                }
            }
        )
        return { clientSecret: paymentIntent.client_secret, shippingPrice: order.shippingPrice }
    }
}
