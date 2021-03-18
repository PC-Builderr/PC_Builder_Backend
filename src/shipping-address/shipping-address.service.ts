import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Stripe from 'stripe'
import { Repository } from 'typeorm'
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto'
import { ShippingAddress } from './entity/shipping-address.entity'

@Injectable()
export class ShippingAddressService {
    constructor(
        @InjectRepository(ShippingAddress)
        private readonly shippingAddressRepository: Repository<ShippingAddress>
    ) {}

    createShippingAddressFromStripeEvent(
        charge: Stripe.Charge | any,
        userId: number
    ): Promise<ShippingAddress> {
        const { address, name, phone } = charge.shipping

        const shippingAddress: ShippingAddress = this.shippingAddressRepository.create({
            city: address.city,
            address: address.line1,
            postCode: address.postal_code,
            name,
            phone,
            userId
        })

        return this.shippingAddressRepository.save(shippingAddress)
    }

    create(
        createShippingAddressDto: CreateShippingAddressDto,
        userId: number
    ): Promise<ShippingAddress> {
        const shippingAddress: ShippingAddress = this.shippingAddressRepository.create({
            ...createShippingAddressDto,
            userId
        })

        return this.shippingAddressRepository.save(shippingAddress)
    }

    async getUserShippingAddresses(userId: number): Promise<ShippingAddress[]> {
        const addresses: ShippingAddress[] = await this.shippingAddressRepository.find({
            userId
        })

        if (!addresses.length) {
            throw new NotFoundException()
        }

        return addresses
    }
}
