import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductService } from 'src/products/product/product.service'
import { STORAGE_PRODUCT } from 'src/utils/constants'
import { FindComponentService } from '../find-component.service'
import { CapacityResponseDto } from './dto/capacity-response.dto'
import { CreateStorageDto } from './dto/create-storage.dto'
import { TypeResponseDto } from './dto/type-response.dto'
import { Storage } from './entity/storage.entity'
import { StorageRepository } from './repository/storage.repository'

@Injectable()
export class StorageService extends FindComponentService<Storage> {
    constructor(
        @InjectRepository(Storage)
        private readonly storageRepository: StorageRepository,
        private readonly productService: ProductService
    ) {
        super(storageRepository)
    }

    async create(createStorageDto: CreateStorageDto): Promise<Storage> {
        const product: Product = await this.productService.findOne(
            createStorageDto.productId,
            STORAGE_PRODUCT
        )

        return this.storageRepository.save({ ...createStorageDto, product })
    }

    async findStorageCapacities(): Promise<CapacityResponseDto> {
        const capacity: number[] = await this.storageRepository.findStorageCapacities()

        if (!capacity.length) {
            throw new NotFoundException()
        }

        return { capacity }
    }

    async findStorageTypes(): Promise<TypeResponseDto> {
        const types: string[] = await this.storageRepository.findStorageTypes()

        if (!types.length) {
            throw new NotFoundException()
        }

        return { types }
    }
}
