import { ObjectLiteral } from 'typeorm'

export interface FilterObject {
    condition: string
    values: ObjectLiteral
}
