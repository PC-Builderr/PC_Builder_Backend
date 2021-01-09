import { ComponentFilters } from './component-filters'

export interface FindComponent<T extends ComponentFilters> {
    page: number
    count: number
    filters?: T
}
