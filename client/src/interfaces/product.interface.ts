import { Image } from './image.interface'

export interface Product {
    id: number
    name: string
    description: string
    price: number
    type: string
    images: Image[]
    brand: string
}
