import { Module } from '@nestjs/common'
import { CPUModule } from './components/cpu/cpu.module'
import { ProductModule } from './product/product.module'

@Module({
    imports: [ProductModule, CPUModule]
})
export class ProductsModule {}
