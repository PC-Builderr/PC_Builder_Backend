import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { CPU_PRODUCT } from 'src/utils/constants'
import { Repository } from 'typeorm'
import { CPU } from './cpu.entity'
import { CreateCPUDto } from './dto/create-cpu.dto'

@Injectable()
export class CPUService {
    constructor(
        @InjectRepository(CPU)
        private readonly cpuRepository: Repository<CPU>,
        private readonly productService: ProductService
    ) {}

    async getCPUs(): Promise<CPU[]> {
        const cpus: CPU[] = await this.cpuRepository.find()
        if (!cpus.length) throw new NotFoundException()
        return cpus
    }

    async getCPUByProductId(id: number): Promise<CPU> {
        const cpu: CPU = await this.cpuRepository.findOne({
            where: { product: { id } }
        })
        if (!cpu) throw new NotFoundException()
        return cpu
    }

    async createCPU(createCPUDto: CreateCPUDto): Promise<CPU> {
        const product: Product = await this.productService.getProduct(createCPUDto.productId, CPU_PRODUCT)
        const cpu: CPU = this.cpuRepository.create({ ...createCPUDto, product })
        return this.cpuRepository.save(cpu)
    }
}
