import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Product } from 'src/products/product/entity/product.entity'
import { Component } from './component.entity'
import { ComponentFilters } from './component-filters'
import { FindComponent } from './find-component.interface'
import { FindComponentRepository } from './find-component.repository'

@Injectable()
export class FindComponentService<T extends Component> {
    constructor(private readonly componentRepository: FindComponentRepository<T>) {}

    async find<G extends ComponentFilters>(findComponentDto: FindComponent<G>): Promise<Product[]> {
        if (!findComponentDto.page || !findComponentDto.count) throw new BadRequestException()

        const products: Product[] = await this.componentRepository.findFiltered<G>(findComponentDto)
        if (!products.length) throw new NotFoundException()

        return products
    }

    async findByProductId(id: number): Promise<T> {
        const component: T = await this.componentRepository.findByProductId(id)
        if (!component) throw new NotFoundException()

        return component
    }
}
