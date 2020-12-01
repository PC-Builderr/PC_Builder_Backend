import { Module } from '@nestjs/common'
import { CaseModule } from './components/case/case.module'
import { CPUModule } from './components/cpu/cpu.module'
import { GPUModule } from './components/gpu/gpu.module'
import { MotherboardModule } from './components/motherboard/motherboard.module'
import { RAMModule } from './components/ram/ram.module'
import { StorageModule } from './components/storage/storage.module'
import { ProductModule } from './product/product.module'

@Module({
    imports: [
        ProductModule,
        CPUModule,
        CaseModule,
        GPUModule,
        MotherboardModule,
        RAMModule,
        StorageModule
    ]
})
export class ProductsModule {}
