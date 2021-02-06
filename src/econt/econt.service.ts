import { HttpService, Injectable } from '@nestjs/common'
import { OrderProduct } from 'src/order/entity/order-product.entity'
import { Item } from 'src/payment/dto/item'
import { Product } from 'src/products/product/entity/product.entity'
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

@Injectable()
export class EcontService {
    constructor(private readonly httpService: HttpService) {}

    async calculateShipping(orderProducts: OrderProduct[]): Promise<number> {
        const weight: number = this.calculateWeight(orderProducts)

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

    private calculateWeight(orderProducts: OrderProduct[]): number {
        const total: number = orderProducts.reduce(
            (currentTotal: number, orderProduct: OrderProduct): number => {
                switch (orderProduct.product.type) {
                    case COMPUTER_PRODUCT:
                        return currentTotal + ESTIMATED_COMPUTER_WEIGHT * orderProduct.quantity
                    case CASE_PRODUCT:
                        return currentTotal + ESTIMATED_BIG_WEIGHT * orderProduct.quantity
                    case PSU_PRODUCT || GPU_PRODUCT || MOTHERBOARD_PRODUCT:
                        return currentTotal + ESTIMATED_MEDIUM_WEIGHT * orderProduct.quantity
                    case RAM_PRODUCT || CPU_PRODUCT || STORAGE_PRODUCT:
                        return currentTotal + ESTIMATED_SMALL_WEIGHT * orderProduct.quantity
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
