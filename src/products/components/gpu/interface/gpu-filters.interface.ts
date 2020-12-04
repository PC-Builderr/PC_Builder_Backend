import { ProductFilters } from 'src/products/product/interface/product-filters.interface'

export interface GPUFilters extends ProductFilters {
    series?: string
    memory?: number
    memoryType?: string
    busWidth?: number
    format?: string
}
