import { HttpService, Injectable } from '@nestjs/common'
import { Order } from 'src/order/entity/order.entity'
import { Item } from 'src/payment/dto/item'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import {
    CASE_PRODUCT,
    COMPUTER_PRODUCT,
    CPU_PRODUCT,
    ECONT_CREATE_LABEL_URL,
    ESTIMATED_BIG_WEIGHT,
    ESTIMATED_COMPUTER_WEIGHT,
    ESTIMATED_MEDIUM_WEIGHT,
    ESTIMATED_SMALL_WEIGHT,
    GPU_PRODUCT,
    MOTHERBOARD_PRODUCT,
    PSU_PRODUCT,
    RAM_PRODUCT,
    STORAGE_PRODUCT
} from 'src/utils/constants'
import { calculateShippingLabel } from './data/calculate-shipping-label'
import { CartItems } from './interface/cart-items.interface'
import { CreateLabelResponse } from './interface/create-label-response.interface'

@Injectable()
export class EcontService {
    constructor(
        private readonly httpService: HttpService,
        private readonly productService: ProductService
    ) {}

    async createLabel(order: Order): Promise<CreateLabelResponse> {
        const weight = this.calculateWeight(order.orderProducts)

        const response = await this.httpService.post(ECONT_CREATE_LABEL_URL, {
            label: {
                senderClient: {
                    name: 'Иван Иванов',
                    phones: ['0888888888']
                },
                senderAddress: {
                    city: {
                        country: {
                            code3: 'BGR'
                        },
                        name: 'Русе',
                        postCode: '7010'
                    },
                    street: 'Алея Младост',
                    num: '7'
                },
                receiverClient: {
                    name: order.shippingAddress.name,
                    phones: [order.shippingAddress.phone]
                },
                receiverAddress: {
                    city: {
                        country: {
                            code3: 'BGR'
                        },
                        name: order.shippingAddress.city,
                        postCode: order.shippingAddress.postCode
                    },
                    street: order.shippingAddress.address
                },
                packCount: 1,
                services: {
                    smsNotification: true
                },
                emailOnDelivery: order.user.email,
                shipmentType: 'PACK',
                shipmentDescription: 'Компютърни компоненти или компютър',
                weight
            },
            mode: 'create'
        })

        const { data } = await response.toPromise()

        return {
            shipmentNumber: data.label.shipmentNumber,
            pdfURL: data.label.pdfURL,
            expectedDeliveryDate: new Date(data.label.expectedDeliveryDate)
        }
    }

    async getCartItemsFromItems(items: Item[]): Promise<CartItems[]> {
        const ids: number[] = items.map((item: Item) => item.id)

        const products: Product[] = await this.productService.findByIds(ids)

        return products.map(
            (product: Product): CartItems => {
                const item: Item = items.find((item: Item) => item.id === product.id)
                return {
                    product,
                    quantity: item.quantity
                }
            }
        )
    }

    async calculateShipping(cartItems: CartItems[]): Promise<number> {
        const weight: number = this.calculateWeight(cartItems)

        const response = await this.httpService.post(ECONT_CREATE_LABEL_URL, {
            label: {
                ...calculateShippingLabel,
                weight
            },
            mode: 'calculate'
        })
        const data = await response.toPromise()

        const shippingPrice: number = data.data.label.totalPrice

        return Number(shippingPrice.toFixed(2))
    }

    private calculateWeight(cartItems: CartItems[]): number {
        const total: number = cartItems.reduce(
            (currentTotal: number, cartItem: CartItems): number => {
                switch (cartItem.product.type) {
                    case COMPUTER_PRODUCT:
                        return currentTotal + ESTIMATED_COMPUTER_WEIGHT * cartItem.quantity
                    case CASE_PRODUCT:
                        return currentTotal + ESTIMATED_BIG_WEIGHT * cartItem.quantity
                    case PSU_PRODUCT || GPU_PRODUCT || MOTHERBOARD_PRODUCT:
                        return currentTotal + ESTIMATED_MEDIUM_WEIGHT * cartItem.quantity
                    case RAM_PRODUCT || CPU_PRODUCT || STORAGE_PRODUCT:
                        return currentTotal + ESTIMATED_SMALL_WEIGHT * cartItem.quantity
                    default:
                        return currentTotal
                }
            },
            0
        )

        if (total < 1) {
            return 1
        }
        
        return Math.round(total)
    }
}
