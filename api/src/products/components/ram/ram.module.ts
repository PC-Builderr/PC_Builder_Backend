import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { RAMController } from './ram.controller'
import { RAM } from './ram.entity'
import { RAMService } from './ram.service'

@Module({
    imports: [TypeOrmModule.forFeature([RAM]), ProductModule],
    providers: [RAMService],
    controllers: [RAMController]
})
export class RAMModule {}
