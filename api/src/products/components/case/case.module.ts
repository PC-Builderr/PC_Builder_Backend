import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductModule } from 'src/products/product/product.module'
import { CaseController } from './case.controller'
import { Case } from './case.entity'
import { CaseService } from './case.service'

@Module({
    imports: [TypeOrmModule.forFeature([Case]), ProductModule],
    providers: [CaseService],
    controllers: [CaseController]
})
export class CaseModule {}
