export const ADMIN: string = 'ADMIN'
export const AUTH: string = 'AUTH'

export const PASSWORD_REGEX: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/
export const EMAIL_REGEX: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const LINK_REGEX: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
export const RAM_TYPE: RegExp = /DDR([1-9])/
export const GPU_MEM: RegExp = /GDDR([1-9])/

export const FORMAT_TYPES: string[] = ['ATX', 'micro-ATX', 'mini-ITX']
export const RAM_CAPACITIES: number[] = [2, 4, 8, 16, 32]

export const CPU_PRODUCT: string = 'cpu'
export const CASE_PRODUCT: string = 'case'
export const GPU_PRODUCT: string = 'gpu'
export const MOTHERBOARD_PRODUCT: string = 'motherboard'
export const PSU_PRODUCT: string = 'psu'
export const RAM_PRODUCT: string = 'ram'
export const STORAGE_PRODUCT: string = 'storage'

export const COMPONENT_TYPES: string[] = [
    CPU_PRODUCT,
    GPU_PRODUCT,
    PSU_PRODUCT,
    RAM_PRODUCT,
    MOTHERBOARD_PRODUCT,
    STORAGE_PRODUCT,
    CASE_PRODUCT
]

export const PRODUCT_FILTER_FIELEDS: string[] = ['minPrice', 'maxPrice', 'brandId']

export const CPU_FILTER_FIELDS: string[] = [
    ...PRODUCT_FILTER_FIELEDS,
    'generation',
    'series',
    'socket',
    'ramType',
    'ramCapacity',
    'ramChannels'
]
