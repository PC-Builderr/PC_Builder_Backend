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
import { AdminJwtGuard } from 'src/admin/admin.guard'
import { STORAGE_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { CreateStorageDto } from './dto/create-storage.dto'
import { Storage } from './storage.entity'
import { StorageService } from './storage.service'
import { StorageArrayResponse, StorageResponse } from './interface/storage-response.interface'

@Controller(STORAGE_PRODUCT)
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Get()
    async getStorage(): Promise<StorageArrayResponse> {
        const storages: Storage[] = await this.storageService.getStorages()
        return { storages }
    }

    @Get(':id')
    async getStorageByProductId(@Param('id', ParseIntPipe) id: number): Promise<StorageResponse> {
        const storage: Storage = await this.storageService.getStorageByProductId(id)
        return { storage }
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    async createStorage(
        @Body(ValidationPipe) createStorageDto: CreateStorageDto
    ): Promise<StorageResponse> {
        try {
            const storage: Storage = await this.storageService.createStorage(createStorageDto)
            return { storage }
        } catch (error) {
            errorHandler(error)
        }
    }
}
