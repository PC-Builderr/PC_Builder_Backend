import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isIn } from 'class-validator'
import { Product } from '../product/product.entity'
import { ProductService } from '../product/product.service'
import { Component } from './component.entity'
import { ComponentRepository } from './component.repository'

@Injectable()
export class ComponentService<T extends Component> {
    constructor(
        @InjectRepository(ComponentRepository)
        private readonly repository: ComponentRepository<T>,
        private readonly productService: ProductService,
        private readonly productType: string
    ) {}

    async find(filters: string): Promise<Product[]> {
        const components: T[] = await this.repository.findFiltered(filters)
        if (!components.length) throw new NotFoundException()
        const products: Product[] = components.map((component: T) => component.product)
        return products
    }

    async findByProductId(id: number): Promise<T> {
        const component: T = await this.repository.findOne({
            where: { productId: id },
            relations: ['product', 'product.images', 'product.brand']
        })
        if (!component) throw new NotFoundException()
        return component
    }

    async create(createDto: any): Promise<T> {
        const product: Product = await this.productService.findOne(
            createDto.productId,
            this.productType
        )
        return this.repository.save({ ...createDto, product })
    }
}
