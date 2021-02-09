export const ADMIN: string = 'ADMIN'
export const AUTH: string = 'AUTH'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const REFRESH_TOKEN_COOKIE_NAME: string = 'refresh-token'

export const ECONT_CREATE_LABEL_URL: string =
    'http://ee.econt.com/services/Shipments/LabelService.createLabel.json'

export const PASSWORD_REGEX: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/

export const CPU_PRODUCT: string = 'cpu'
export const CASE_PRODUCT: string = 'case'
export const GPU_PRODUCT: string = 'gpu'
export const MOTHERBOARD_PRODUCT: string = 'motherboard'
export const PSU_PRODUCT: string = 'psu'
export const RAM_PRODUCT: string = 'ram'
export const STORAGE_PRODUCT: string = 'storage'
export const COMPUTER_PRODUCT: string = 'computer'

export const COMPONENT_TYPES: string[] = [
    CPU_PRODUCT,
    GPU_PRODUCT,
    PSU_PRODUCT,
    RAM_PRODUCT,
    MOTHERBOARD_PRODUCT,
    STORAGE_PRODUCT,
    CASE_PRODUCT
]

export const STORAGE_TYPES: string[] = ['SATA', 'М.2 NVMe']
export const FORMAT_TYPES: Map<string, number> = new Map([
    ['ATX', 3],
    ['micro-ATX', 2],
    ['mini-ITX', 1]
])
export const ESTIMATED_COMPUTER_WEIGHT: number = 7
export const ESTIMATED_BIG_WEIGHT: number = 3
export const ESTIMATED_MEDIUM_WEIGHT: number = 1
export const ESTIMATED_SMALL_WEIGHT: number = 0.2

export const ONE_MINUTE_IN_MILISECONDS: number = 1000 * 60

export const ONE_LEV_IN_STOTINKI: number = 100

export enum ORDER_STATUS {
    AWAITING_PAYMENT = 'AWAITING_PAYMENT',
    PAYMENT_SUCCEEDED = 'PAYMENT_SUCCEEDED',
    PAYMENT_FAILED = 'PAYMENT_FAILED',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED'
}
