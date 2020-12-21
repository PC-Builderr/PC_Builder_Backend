import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { ProductResponse } from 'src/products/product/interface/product-response.interface'
import { STORAGE_PRODUCT } from 'src/utils/constants'
import { ComponentController } from '../component.controller'
import { CreateStorageDto } from './dto/create-storage.dto'
import { Storage } from './entity/storage.entity'
import { StorageService } from './storage.service'

@Controller(STORAGE_PRODUCT)
export class StorageController extends ComponentController<Storage> {
    constructor(storageService: StorageService) {
        super(storageService)
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async createStorage(
        @Body(ValidationPipe) createStorageDto: CreateStorageDto
    ): Promise<ProductResponse<Storage>> {
        return super.createComponent<CreateStorageDto>(createStorageDto)
    }
}
