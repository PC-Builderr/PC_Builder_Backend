export const ADMIN: string = 'ADMIN'
export const AUTH: string = 'AUTH'
export const PASSWORD_REGEX: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/
export const EMAIL_REGEX: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const LINK_REGEX: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
export const RAM_TYPE: RegExp = /DDR([1-9])/
export const GPU_MEM: RegExp = /GDDR([1-9])/
export const ONE_HOUR: number = 3600
export const FORMAT_TYPES: string[] = ['ATX', 'micro-ATX', 'mini-ITX']
export const CPU_TYPE: string = 'CPU'
export const CASE_TYPE: string = 'CASE'
export const GPU_TYPE: string = 'GPU'
export const MOTHERBOARD_TYPE: string = 'MOTHERBOARD'
export const COMPONENT_TYPES: string[] = [
    CPU_TYPE,
    GPU_TYPE,
    'PSU',
    'RAM',
    MOTHERBOARD_TYPE,
    'Storage',
    CASE_TYPE
]
