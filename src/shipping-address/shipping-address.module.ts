import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingAddress } from './entity/shipping-address.entity';
import { ShippingAddressController } from './shipping-address.controller';
import { ShippingAddressService } from './shipping-address.service';

@Module({
    imports: [TypeOrmModule.forFeature([ShippingAddress])],
    controllers: [ShippingAddressController],
    providers: [ShippingAddressService],
    exports:[ShippingAddressService]
})
export class ShippingAddressModule {}
