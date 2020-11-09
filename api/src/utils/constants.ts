export const ADMIN = 'ADMIN'
export const AUTH = 'AUTH'
export const PASSWORD_REGEX = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const LINK_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
export const RAM_TYPE = /DDR([1-9])/
export const GPU_MEM = /GDDR([1-9])/
export const ONE_HOUR = 3600
export const FORMAT_TYPES = ['ATX', 'micro-ATX', 'mini-ITX']
export const CPU_TYPE = 'CPU'
export const CASE_TYPE = 'CASE'
export const GPU_TYPE = 'GPU'
export const COMPONENT_TYPES = [
    CPU_TYPE,
    GPU_TYPE,
    'PSU',
    'RAM',
    'Mother Board',
    'Storage',
    CASE_TYPE
]
