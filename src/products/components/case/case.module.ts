import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { CaseController } from './case.controller'
import { CaseService } from './case.service'
import { CaseRepository } from './repository/case.repository'

@Module({
    imports: [TypeOrmModule.forFeature([CaseRepository]), ProductModule],
    providers: [CaseService],
    controllers: [CaseController],
    exports: [CaseService]
})
export class CaseModule {}
