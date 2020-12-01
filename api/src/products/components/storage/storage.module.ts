import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { StorageController } from './storage.controller'
import { StorageRepository } from './storage.repository'
import { StorageService } from './storage.service'

@Module({
    imports: [TypeOrmModule.forFeature([StorageRepository]), ProductModule],
    providers: [StorageService],
    controllers: [StorageController]
})
export class StorageModule {}
