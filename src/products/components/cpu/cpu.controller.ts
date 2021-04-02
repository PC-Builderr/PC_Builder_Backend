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
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import {
    ProductArrayResponse,
    ProductResponse
} from 'src/products/product/interface/product-response.interface'
import { CPU_PRODUCT } from 'src/utils/constants'
import { errorHandler } from 'src/utils/error-handler'
import { MinMaxPrice } from '../min-max-price.interface'
import { CPUService } from './cpu.service'
import { CreateCPUDto } from './dto/create-cpu.dto'
import { CPUFilters } from './dto/find/cpu-filters'
import { FindCPUDto } from './dto/find/find-cpu.dto'
import { GenerationResponseDto } from './dto/generation-response.dto'
import { SeriesResponseDto } from '../series-response.dto'
import { CPU } from './entity/cpu.entity'

@Controller(CPU_PRODUCT)
export class CPUController {
    constructor(private readonly cpuService: CPUService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    getCPUs(
        @Body(
            new ValidationPipe({
                skipUndefinedProperties: true,
                whitelist: true
            })
        )
        findCPUDto: FindCPUDto
    ): Promise<ProductArrayResponse> {
        try {
            return this.cpuService.find<CPUFilters>(findCPUDto)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    getMinMaxPrice(
        @Body(
            new ValidationPipe({
                skipUndefinedProperties: true,
                whitelist: true
            })
        )
        cpuFilters: CPUFilters
    ): Promise<MinMaxPrice> {
        try {
            return this.cpuService.getMinMaxPrice<CPUFilters>(cpuFilters)
        } catch (error) {
            errorHandler(error)
        }
    }

    @Get('generation')
    async getCPUGenerations(): Promise<GenerationResponseDto> {
        return this.cpuService.findCPUGenerations()
    }

    @Get('series')
    async getSeries(): Promise<SeriesResponseDto> {
        return this.cpuService.findSeries()
    }

    @Get(':id')
    async getCPUByProductId(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse<CPU>> {
        const component: CPU = await this.cpuService.findByProductId(id)

        return { component }
    }

    @UseGuards(AdminJwtGuard)
    @Post('/create')
    async createCPU(
        @Body(ValidationPipe) createCPUDto: CreateCPUDto
    ): Promise<ProductResponse<CPU>> {
        try {
            const component: CPU = await this.cpuService.create(createCPUDto)

            return { component }
        } catch (error) {
            errorHandler(error)
        }
    }
}
