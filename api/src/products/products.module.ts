import { Module } from '@nestjs/common'
import { BrandModule } from '../brand/brand.module'
import { ImageModule } from '../image/image.module'
import { CaseModule } from './components/case/case.module'
import { CPUModule } from './components/cpu/cpu.module'
import { GPUModule } from './components/gpu/gpu.module'
import { MotherboardModule } from './components/motherboard/motherboard.module'
import { ProductModule } from './product/product.module'

@Module({
    imports: [ProductModule, CPUModule, CaseModule, GPUModule, MotherboardModule]
})
export class ProductsModule {}
