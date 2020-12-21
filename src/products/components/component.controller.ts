import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { errorHandler } from 'src/utils/error-handler'
import { Product } from '../product/entity/product.entity'
import {
    ProductArrayResponse,
    ProductResponse
} from '../product/interface/product-response.interface'
import { Component } from './component.entity'
import { ComponentService } from './component.service'

@Controller()
export class ComponentController<T extends Component> {
    constructor(private readonly service: ComponentService<T>) {}

    @Get()
    async find(@Query('filters') filters: string): Promise<ProductArrayResponse> {
        const products: Product[] = await this.service.find(filters)
        return { products }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse<T>> {
        const product: T = await this.service.findByProductId(id)
        return { product }
    }

    protected async createComponent<DtoType>(
        createComponentDto: DtoType
    ): Promise<ProductResponse<T>> {
        try {
            const product: T = await this.service.create(createComponentDto)
            return { product }
        } catch (error) {
            errorHandler(error)
        }
    }
}
