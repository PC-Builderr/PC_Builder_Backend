import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { RAMController } from './ram.controller'
import { RAMService } from './ram.service'
import { RAMRepository } from './repository/ram.repository'

@Module({
    imports: [TypeOrmModule.forFeature([RAMRepository]), ProductModule],
    providers: [RAMService],
    controllers: [RAMController],
    exports: [RAMService]
})
export class RAMModule {}
