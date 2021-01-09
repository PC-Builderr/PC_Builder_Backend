import { Controller } from '@nestjs/common'
import { RAM_PRODUCT } from 'src/utils/constants'
import { RAMService } from './ram.service'

@Controller(RAM_PRODUCT)
export class RAMController {
    constructor(private readonly ramService: RAMService) {}
}
