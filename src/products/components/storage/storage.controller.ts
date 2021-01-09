import { Controller } from '@nestjs/common'
import { STORAGE_PRODUCT } from 'src/utils/constants'
import { StorageService } from './storage.service'

@Controller(STORAGE_PRODUCT)
export class StorageController {
    constructor(private readonly storageService: StorageService) {}
}
