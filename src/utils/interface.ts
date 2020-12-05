import { ObjectLiteral } from 'typeorm'

export interface FilterObject {
    where: string
    parameters: ObjectLiteral
}
