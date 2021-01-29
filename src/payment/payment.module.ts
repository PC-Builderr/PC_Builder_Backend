import { Module } from '@nestjs/common'
import { EcontModule } from 'src/econt/econt.module'
import { ProductModule } from 'src/products/product/product.module'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'

@Module({
    imports: [ProductModule, EcontModule],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule {}
