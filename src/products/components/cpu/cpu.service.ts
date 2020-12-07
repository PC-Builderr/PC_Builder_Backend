import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { CPU_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { CPU } from './cpu.entity'
import { CPURepository } from './cpu.repository'
import { CreateCPUDto } from './dto/create-cpu.dto'

@Injectable()
export class CPUService extends ComponentService<CPU> {
    constructor(
        @InjectRepository(CPU)
        readonly cpuRepository: CPURepository,
        readonly productService: ProductService
    ) {
        super(cpuRepository, productService, CPU_PRODUCT)
    }
}
