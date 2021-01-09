import { IsIn } from 'class-validator'
import { FORMAT_TYPES } from 'src/utils/constants'
import { ComponentFilters } from '../../../component-filters'

export class CaseFilters extends ComponentFilters {
    @IsIn(Array.from(FORMAT_TYPES.keys()))
    format: string
}
