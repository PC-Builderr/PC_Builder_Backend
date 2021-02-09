import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { ProductModule } from 'src/products/product/product.module'
import { EcontModule } from 'src/econt/econt.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderProduct } from './entity/order-product.entity'
import { Order } from './entity/order.entity'
import { ShippingAddress } from './entity/shippingAddress.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderProduct, Order, ShippingAddress]),
        ProductModule,
        EcontModule
    ],
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService]
})
export class OrderModule {}
