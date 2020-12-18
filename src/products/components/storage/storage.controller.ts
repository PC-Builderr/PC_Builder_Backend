import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { STORAGE_PRODUCT } from 'src/utils/constants'
import { CreateStorageDto } from './dto/create-storage.dto'
import { Storage } from './storage.entity'
import { StorageService } from './storage.service'
import { ComponentController } from '../component.controller'
import { ProductResponse } from 'src/products/product/interface/product-response.interface'

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
