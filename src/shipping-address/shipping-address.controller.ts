import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthJwtGuard } from 'src/auth/guard/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interface/refresh-token-request.interface'
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto'
import { ShippingAddress } from './entity/shipping-address.entity'
import { ShippingAddressesResponse } from './interfaces/shipping-addresses-response.interface'
import { ShippingAddressService } from './shipping-address.service'

@Controller('shipping-address')
export class ShippingAddressController {
    constructor(private readonly shippingAddressService: ShippingAddressService) {}

    @UseGuards(AuthJwtGuard)
    @Post()
    create(
        @Req() req: AuthenticatedRequest,
        @Body(ValidationPipe) createShippingAddressDto: CreateShippingAddressDto
    ): Promise<ShippingAddress> {
        return this.shippingAddressService.create(createShippingAddressDto, req.user.id)
    }

    @UseGuards(AuthJwtGuard)
    @Get()
    async getAll(@Req() req: AuthenticatedRequest): Promise<ShippingAddressesResponse> {
        const shippingAddresses = await this.shippingAddressService.getUserShippingAddresses(
            req.user.id
        )

        return { shippingAddresses }
    }
}
