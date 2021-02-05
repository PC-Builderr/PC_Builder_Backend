import { Injectable } from '@nestjs/common'

@Injectable()
export class OrderService {
    createOrder(): string {
        return 'oredr'
    }
}
