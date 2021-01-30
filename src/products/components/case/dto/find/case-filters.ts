import { IsArray, IsString } from 'class-validator'
import { ComponentFilters } from '../../../component-filters'

export class CaseFilters extends ComponentFilters {
    @IsArray()
    @IsString({ each: true })
    format: string[]
}
