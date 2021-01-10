import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Product } from 'src/products/product/entity/product.entity'
import { Component } from './component.entity'
import { ComponentFilters } from './component-filters'
import { FindComponent } from './find-component.interface'
import { FindComponentRepository } from './find-component.repository'
import { ProductArrayResponse } from '../product/interface/product-response.interface'

@Injectable()
export class FindComponentService<T extends Component> {
    constructor(private readonly componentRepository: FindComponentRepository<T>) {}

    async find<G extends ComponentFilters>(
        findComponentDto: FindComponent<G>
    ): Promise<ProductArrayResponse> {
        if (!findComponentDto.page || !findComponentDto.count) throw new BadRequestException()

        const productArrayResponse: ProductArrayResponse = await this.componentRepository.findFiltered<
            G
        >(findComponentDto)
        if (!productArrayResponse.products.length) throw new NotFoundException()

        return productArrayResponse
    }

    async findByProductId(id: number): Promise<T> {
        const component: T = await this.componentRepository.findByProductId(id)
        if (!component) throw new NotFoundException()

        return component
    }
}
