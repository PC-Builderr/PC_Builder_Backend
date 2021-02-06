import { Module } from '@nestjs/common'
import { OrderModule } from 'src/order/order.module'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'

@Module({
    imports: [OrderModule],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule {}
