import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { StorageRepository } from './repository/storage.repository'
import { StorageController } from './storage.controller'
import { StorageService } from './storage.service'

@Module({
    imports: [TypeOrmModule.forFeature([StorageRepository]), ProductModule],
    providers: [StorageService],
    controllers: [StorageController],
    exports: [StorageService]
})
export class StorageModule {}
