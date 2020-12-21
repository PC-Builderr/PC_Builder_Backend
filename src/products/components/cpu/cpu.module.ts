import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { CPUController } from './cpu.controller'
import { CPUService } from './cpu.service'
import { CPURepository } from './repository/cpu.repository'

@Module({
    imports: [TypeOrmModule.forFeature([CPURepository]), ProductModule],
    providers: [CPUService],
    controllers: [CPUController],
    exports: [CPUService]
})
export class CPUModule {}
