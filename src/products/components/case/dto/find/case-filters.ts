import { ArrayMinSize, IsArray, IsString } from 'class-validator'
import { ComponentFilters } from '../../../component-filters'

export class CaseFilters extends ComponentFilters {
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    series?: string[]

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    format: string[]
}
