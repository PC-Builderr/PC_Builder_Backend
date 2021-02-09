import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
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
import { ShippingAddress } from './entity/shippingAddress.entity'
import { OrderArrayResponse } from './interface/order-array-response.interface'
import { OrderResponse } from './interface/order-response.interface'
import { Prices } from './interface/prices.interface'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderProduct)
        private readonly orderProductRepository: Repository<OrderProduct>,
        @InjectRepository(ShippingAddress)
        private readonly shippingAddressRepository: Repository<ShippingAddress>,
        private readonly productService: ProductService,
        private readonly econtService: EcontService
    ) {}

    async getAllOrders(): Promise<OrderArrayResponse> {
        const orders: Order[] = await this.orderRepository.find()

        if (!orders.length) {
            throw new NotFoundException()
        }

        return { orders }
    }

    async getAvailableOrders(
        status: ORDER_STATUS,
        id: number | null = null
    ): Promise<OrderArrayResponse> {
        const orders: Order[] = await this.orderRepository.find({
            where: { status, adminId: id }
        })

        if (!orders.length) {
            throw new NotFoundException()
        }

        return { orders }
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

    chargeExpiredHandler(charge: Stripe.Charge | any) {
        const id: number = Number(charge.metadata.orderId)
        if (!id) throw new BadRequestException()

        this.orderProductRepository.delete({ orderId: id })
        this.orderRepository.delete(id)
    }

    async updateOrder(event: Stripe.Event, status: ORDER_STATUS) {
        const order: Order = await this.getOrderFromStripeEvent(event.data.object)

        if (!order) throw new NotFoundException()

        const shippingAddress: ShippingAddress = await this.createShippingAddress(event.data.object)

        order.shippingAddress = shippingAddress
        order.paymentIntentId = event.data.object['payment_intent']
        order.recieptUrl = event.data.object['receipt_url']
        order.status = status

        this.orderRepository.save(order)
    }

    async processOrder(orderId: number, adminId: number): Promise<OrderResponse> {
        const order: Order = await this.orderRepository.findOne(orderId)

        if (!order || order.adminId) {
            throw new NotFoundException()
        }

        order.adminId = adminId
        order.status = ORDER_STATUS.PROCESSING

        await this.orderRepository.save(order)

        return { order }
    }

    async setPaymentIntentId(orderId: number, paymentIntentId: string) {
        const order = await this.orderRepository.findOne(orderId)

        if (!order) {
            throw new NotFoundException()
        }

        order.paymentIntentId = paymentIntentId

        this.orderRepository.save(order)
    }

    private createShippingAddress(charge: Stripe.Charge | any): Promise<ShippingAddress> {
        const { address, name, phone } = charge.shipping

        const shippingAddress: ShippingAddress = this.shippingAddressRepository.create({
            city: address.city,
            address: address.line1,
            postCode: address.postal_code,
            name,
            phone
        })

        return this.shippingAddressRepository.save(shippingAddress)
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

    private getOrderFromStripeEvent(charge: Stripe.Charge | any): Promise<Order> {
        const id: number = Number(charge.metadata.orderId)

        if (!id) throw new BadRequestException()

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
