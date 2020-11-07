import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { CPU_TYPE } from 'src/utils/constants'
import { Options } from 'src/utils/options.interface'
import { Repository } from 'typeorm'
import { CPU } from './cpu.entity'
import { CreateCPUDto } from './dto/create-cpu.dto'

@Injectable()
export class CPUService {
    private options: Options = {
        relations: ['product', 'product.images', 'product.brand']
    }

    constructor(
        @InjectRepository(CPU)
        private readonly cpuRepository: Repository<CPU>,
        private readonly productService: ProductService
    ) {}

    async getCPUs(): Promise<Array<CPU>> {
        const cpus: Array<CPU> = await this.cpuRepository.find(this.options)
        if (!cpus.length) throw new NotFoundException()
        return cpus
    }

    async getCPUById(id: number): Promise<CPU> {
        const cpu: CPU = await this.cpuRepository.findOne(id, this.options)
        if (!cpu) throw new NotFoundException()
        return cpu
    }

    async createCPU(createCPUDto: CreateCPUDto): Promise<CPU> {
        const product: Product = await this.productService.getProduct(
            createCPUDto.productId,
            CPU_TYPE
        )
        const cpu: CPU = this.cpuRepository.create({ ...createCPUDto, product })
        return this.cpuRepository.save(cpu)
    }
}
