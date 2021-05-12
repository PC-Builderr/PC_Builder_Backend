import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EcontService } from 'src/econt/econt.service'
import { CreateLabelResponse } from 'src/econt/interface/create-label-response.interface'
import { Item } from 'src/payment/dto/item'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { User } from 'src/user/entity/user.entity'
import { ORDER_STATUS } from 'src/utils/constants'
import Stripe from 'stripe'
import { In, Repository } from 'typeorm'
import { OrderProduct } from './entity/order-product.entity'
import { Order } from './entity/order.entity'
import { ShippingAddress } from '../shipping-address/entity/shipping-address.entity'
import { OrderArrayResponse } from './interface/order-array-response.interface'
import { OrderResponse } from './interface/order-response.interface'
import { Prices } from './interface/prices.interface'
import { ShippingAddressService } from 'src/shipping-address/shipping-address.service'
import { MailService } from 'src/mail/mail.service'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderProduct)
        private readonly orderProductRepository: Repository<OrderProduct>,
        private readonly shippingAddressService: ShippingAddressService,
        private readonly productService: ProductService,
        private readonly econtService: EcontService,
        private readonly mailService: MailService
    ) {}

    async getOrderById(orderId: number): Promise<OrderResponse> {
        const order: Order = await this.orderRepository.findOne(orderId, {
            relations: ['orderProducts', 'shippingAddress', 'orderProducts.product', 'user']
        })

        if (!order) {
            throw new NotFoundException()
        }

        return { order }
    }

    async getAllOrders(): Promise<OrderArrayResponse> {
        const orders: Order[] = await this.orderRepository.find()

        if (!orders.length) {
            throw new NotFoundException()
        }

        return { orders }
    }

    async getAvailableOrders(
        statuses: ORDER_STATUS[],
        id: number | null = null
    ): Promise<OrderArrayResponse> {
        const orders: Order[] = await this.orderRepository.find({
            where: { status: In(statuses), adminId: id }
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

        order.shippingAddressId = +event.data.object['shipping'].address.line1
        order.status = status
        order.paymentIntentId = event.data.object['payment_intent']
        order.recieptUrl = event.data.object['receipt_url']

        await this.orderRepository.save(order)
    }

    async processOrder(orderId: number, adminId: number): Promise<OrderResponse> {
        const order: Order = await this.orderRepository.findOne(orderId, {
            relations: ['user', 'shippingAddress'],
            where: { status: ORDER_STATUS.PAYMENT_SUCCEEDED }
        })

        if (!order || order.adminId) {
            throw new NotFoundException()
        }

        order.adminId = adminId
        order.status = ORDER_STATUS.PROCESSING

        this.mailService.sendNewStatusMail(
            order.user.email,
            order.shippingAddress.name,
            ORDER_STATUS.PROCESSING
        )

        await this.orderRepository.save(order)

        return { order }
    }

    async setPaymentIntentId(orderId: number, paymentIntentId: string) {
        const order = await this.orderRepository.findOne(orderId)

        if (!order) {
            throw new NotFoundException()
        }

        order.paymentIntentId = paymentIntentId

        await this.orderRepository.save(order)
    }

    async requestCourier(orderId: number, adminId: number) {
        const order: Order = await this.orderRepository.findOne(orderId, {
            where: { adminId, status: ORDER_STATUS.PROCESSING },
            relations: ['orderProducts', 'shippingAddress', 'orderProducts.product', 'user']
        })

        if (!order) {
            throw new NotFoundException()
        }

        const {
            expectedDeliveryDate,
            pdfURL,
            shipmentNumber
        }: CreateLabelResponse = await this.econtService.createLabel(order)

        order.status = ORDER_STATUS.COURIER_REQUESTED
        order.expectedDeliveryDate = expectedDeliveryDate
        order.pdfURL = pdfURL
        order.shipmentNumber = shipmentNumber

        delete order.orderProducts

        this.mailService.sendNewStatusMail(
            order.user.email,
            order.shippingAddress.name,
            ORDER_STATUS.COURIER_REQUESTED
        )

        await this.orderRepository.save(order)
    }

    async finishOrder(orderId: number, adminId: number) {
        const order = await this.orderRepository.findOne(orderId, {
            relations: ['user', 'shippingAddress'],
            where: { status: ORDER_STATUS.COURIER_REQUESTED, adminId }
        })

        if (!order) {
            throw new NotFoundException()
        }

        order.status = ORDER_STATUS.SHIPPED

        this.mailService.sendNewStatusMail(
            order.user.email,
            order.shippingAddress.name,
            ORDER_STATUS.SHIPPED
        )

        await this.orderRepository.save(order)
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
