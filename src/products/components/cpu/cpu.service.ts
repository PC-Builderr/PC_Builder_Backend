import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { CPU_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { FilterCPUDto } from './dto/filter-cpu.dto'
import { CPU } from './entity/cpu.entity'
import { CPURepository } from './repository/cpu.repository'

@Injectable()
export class CPUService {
    constructor(
        @InjectRepository(CPU)
        private readonly cpuRepository: CPURepository,
        private readonly productService: ProductService
    ) {}

    find(filterCPUDto: FilterCPUDto) {
        return this.cpuRepository.findFiltered(filterCPUDto)
    }

    findByProductId(id: number) {
        return new CPU()
    }
}
