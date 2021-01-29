import { HttpService, Injectable } from '@nestjs/common'
import { Item } from 'src/payment/dto/item'
import { Product } from 'src/products/product/entity/product.entity'
import {
    CASE_PRODUCT,
    CPU_PRODUCT,
    ECONT_CREATE_LABEL_URL,
    ESTIMATED_BIG_WEIGHT,
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

    async calculateShipping(products: Product[], items: Item[]): Promise<number> {
        const weight: number = this.calculateWeight(products, items)

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

    private calculateWeight(products: Product[], items: Item[]): number {
        const total: number = products.reduce((currentTotal: number, product: Product): number => {
            const item: Item = items.find((item: Item) => item.id === product.id)
            switch (product.type) {
                case CASE_PRODUCT:
                    return currentTotal + ESTIMATED_BIG_WEIGHT * item.quantity
                case PSU_PRODUCT || GPU_PRODUCT || MOTHERBOARD_PRODUCT:
                    return currentTotal + ESTIMATED_MEDIUM_WEIGHT * item.quantity
                case RAM_PRODUCT || CPU_PRODUCT || STORAGE_PRODUCT:
                    return currentTotal + ESTIMATED_SMALL_WEIGHT * item.quantity
                default:
                    return currentTotal
            }
        }, 0)

        if (total < 1) {
            return 1
        }
        return Math.round(total)
    }
}
