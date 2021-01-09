import { Controller } from '@nestjs/common'
import { MOTHERBOARD_PRODUCT } from 'src/utils/constants'
import { MotherboardService } from './motherboard.service'

@Controller(MOTHERBOARD_PRODUCT)
export class MotherboardController {
    constructor(private readonly motherboardService: MotherboardService) {}
}
