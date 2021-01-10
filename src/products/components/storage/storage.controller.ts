import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { Product } from 'src/products/product/entity/product.entity'
import { ProductArrayResponse } from 'src/products/product/interface/product-response.interface'
import { STORAGE_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateStorageDto } from './dto/create-storage.dto'
import { FindStorageDto } from './dto/find/find-storage.dto'
import { Storage } from './entity/storage.entity'
import { StorageResponse } from './interface/storage-response.interface'
import { StorageService } from './storage.service'

@Controller(STORAGE_PRODUCT)
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Post()
    async find(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findStorageDto: FindStorageDto
    ): Promise<ProductArrayResponse> {
        try {
            return this.storageService.find(findStorageDto)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get(':id')
    async findByProductId(@Param('id', ParseIntPipe) id: number): Promise<StorageResponse> {
        const storage: Storage = await this.storageService.findByProductId(id)
        return { storage }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async create(
        @Body(ValidationPipe) createStorageDto: CreateStorageDto
    ): Promise<StorageResponse> {
        try {
            const storage: Storage = await this.storageService.create(createStorageDto)
            return { storage }
        } catch (error) {
            errorHandler(error)
        }
    }
}
