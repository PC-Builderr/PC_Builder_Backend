import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EcontModule } from 'src/econt/econt.module'
import { MailModule } from 'src/mail/mail.module'
import { ProductModule } from 'src/products/product/product.module'
import { ShippingAddressModule } from 'src/shipping-address/shipping-address.module'
import { OrderProduct } from './entity/order-product.entity'
import { Order } from './entity/order.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderProduct, Order]),
        ProductModule,
        EcontModule,
        ShippingAddressModule,
        MailModule
    ],
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService]
})
export class OrderModule {}
