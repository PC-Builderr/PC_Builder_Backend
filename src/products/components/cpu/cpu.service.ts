import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { CPU_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { CPU } from './cpu.entity'
import { CPURepository } from './cpu.repository'

@Injectable()
export class CPUService extends ComponentService<CPU> {
    constructor(
        @InjectRepository(CPU)
        cpuRepository: CPURepository,
        productService: ProductService
    ) {
        super(cpuRepository, productService, CPU_PRODUCT)
    }
}
