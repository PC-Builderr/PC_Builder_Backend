import { ProductFilters } from 'src/products/product/interface/product-filters.interface'

export interface CPUFilters extends ProductFilters {
    generation?: string
    series?: string
    socket?: string
    ramType?: string
    ramCapacity?: number
    ramChannels?: number
}
