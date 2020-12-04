import { ProductFilters } from 'src/products/product/interface/product-filters.interface'

export interface CaseFilters extends ProductFilters {
    format?: string
}
