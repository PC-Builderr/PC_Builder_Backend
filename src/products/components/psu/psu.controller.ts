import { Controller } from '@nestjs/common'
import { PSU_PRODUCT } from 'src/utils/constants'
import { PSUService } from './psu.service'

@Controller(PSU_PRODUCT)
export class PSUController {
    constructor(private readonly psuService: PSUService) {}
}
