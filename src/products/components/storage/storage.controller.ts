import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { STATUS_CODES } from 'http'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import {
    ProductArrayResponse,
    ProductResponse
} from 'src/products/product/interface/product-response.interface'
import { STORAGE_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { SeriesResponseDto } from '../series-response.dto'
import { CapacityResponseDto } from './dto/capacity-response.dto'
import { CreateStorageDto } from './dto/create-storage.dto'
import { FindStorageDto } from './dto/find/find-storage.dto'
import { TypeResponseDto } from './dto/type-response.dto'
import { Storage } from './entity/storage.entity'
import { StorageService } from './storage.service'

@Controller(STORAGE_PRODUCT)
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async getStorages(
        @Body(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
        findStorageDto: FindStorageDto
    ): Promise<ProductArrayResponse> {
        try {
            return this.storageService.find(findStorageDto)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get('types')
    async getCPUGenerations(): Promise<TypeResponseDto> {
        return this.storageService.findStorageTypes()
    }

    @Get('capacity')
    async getCPUSeries(): Promise<CapacityResponseDto> {
        return this.storageService.findStorageCapacities()
    }

    @Get('series')
    async getCSeries(): Promise<SeriesResponseDto> {
        return this.storageService.findSeries()
    }

    @Get(':id')
    async getStorageByProductId(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProductResponse<Storage>> {
        const component: Storage = await this.storageService.findByProductId(id)

        return { component }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async createStorage(
        @Body(ValidationPipe) createStorageDto: CreateStorageDto
    ): Promise<ProductResponse<Storage>> {
        try {
            const component: Storage = await this.storageService.create(createStorageDto)

            return { component }
        } catch (error) {
            errorHandler(error)
        }
    }
}
