import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { STORAGE_PRODUCT } from 'src/utils/constants'
import { CreateStorageDto } from './dto/create-storage.dto'
import { Storage } from './storage.entity'
import { StorageRepository } from './storage.repository'

@Injectable()
export class StorageService {
    constructor(
        @InjectRepository(Storage)
        private readonly StorageRepository: StorageRepository,
        private readonly productService: ProductService
    ) {}

    async getStorages(): Promise<Storage[]> {
        const storages: Storage[] = await this.StorageRepository.find()
        if (!storages.length) throw new NotFoundException()
        return storages
    }

    async getStorageByProductId(id: number): Promise<Storage> {
        const storage: Storage = await this.StorageRepository.findOne({
            where: { product: { id } }
        })
        if (storage) throw new NotFoundException()
        return storage
    }

    async createStorage(createStorageDto: CreateStorageDto): Promise<Storage> {
        const product: Product = await this.productService.getProduct(
            createStorageDto.productId,
            STORAGE_PRODUCT
        )
        const storage: Storage = this.StorageRepository.create({ ...createStorageDto, product })
        return this.StorageRepository.save(storage)
    }
}
