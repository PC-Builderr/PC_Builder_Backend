import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EcontService } from 'src/econt/econt.service'
import { Item } from 'src/payment/dto/item'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { User } from 'src/user/entity/user.entity'
import { ORDER_STATUS } from 'src/utils/constants'
import Stripe from 'stripe'
import { Repository } from 'typeorm'
import { OrderProduct } from './entity/order-product.entity'
import { Order } from './entity/order.entity'
import { Prices } from './interface/prices.interface'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderProduct)
        private readonly orderProductRepository: Repository<OrderProduct>,
        private readonly productService: ProductService,
        private readonly econtService: EcontService
    ) {}

    chargeExpiredHandler(event: Stripe.Event) {
        const id: number = event.data.object['metadata'].orderId
        this.orderProductRepository.delete({ orderId: id })
        this.orderRepository.delete(id)
    }

    async updateOrderStatus(event: Stripe.Event, status: ORDER_STATUS) {
        const order: Order = await this.getOrderFromStripeEvent(event)

        order.status = status

        this.orderRepository.save(order)
    }

    async createOrder(items: Item[], user: User): Promise<Order> {
        const orderProducts: OrderProduct[] = await this.getOrderProductsFromItems(items)

        const prices: Prices = await this.calculatePrices(orderProducts)

        const order: Order = this.orderRepository.create({
            ...prices,
            orderProducts: orderProducts,
            status: ORDER_STATUS.AWAITING_PAYMENT,
            user
        })

        await this.orderRepository.save(order)

        orderProducts.forEach((orderProduct: OrderProduct) => {
            orderProduct.orderId = order.id
        })

        await this.orderProductRepository.save(orderProducts)

        return order
    }

    private async getOrderProductsFromItems(items: Item[]): Promise<OrderProduct[]> {
        const ids: number[] = items.map((item: Item) => item.id)

        const products: Product[] = await this.productService.findByIds(ids)

        return products.map(
            (product: Product): OrderProduct => {
                const item: Item = items.find((item: Item) => item.id === product.id)
                return this.orderProductRepository.create({
                    product,
                    quantity: item.quantity
                })
            }
        )
    }

    private getOrderFromStripeEvent(event: Stripe.Event): Promise<Order> {
        const id: number = event.data.object['metadata'].orderId
        return this.orderRepository.findOne(id)
    }

    private async calculatePrices(orderProducts: OrderProduct[]): Promise<Prices> {
        const shippingPrice: number = await this.econtService.calculateShipping(orderProducts)

        const productsPrice: number = orderProducts.reduce(
            (total: number, orderProduct: OrderProduct): number => {
                return total + orderProduct.product.price * orderProduct.quantity
            },
            0
        )

        return {
            productsPrice,
            shippingPrice,
            total: productsPrice + shippingPrice
        }
    }
}
