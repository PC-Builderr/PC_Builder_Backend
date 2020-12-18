import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/products/product/product.service'
import { STORAGE_PRODUCT } from 'src/utils/constants'
import { ComponentService } from '../component.service'
import { Storage } from './storage.entity'
import { StorageRepository } from './storage.repository'

@Injectable()
export class StorageService extends ComponentService<Storage> {
    constructor(
        @InjectRepository(Storage)
        storageRepository: StorageRepository,
        productService: ProductService
    ) {
        super(storageRepository, productService, STORAGE_PRODUCT)
    }
}
