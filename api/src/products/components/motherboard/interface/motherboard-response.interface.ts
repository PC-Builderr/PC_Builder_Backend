import { Motherboard } from '../motherboard.entity'

export interface MotherboardResponse {
    motherboard: Motherboard
}
export interface MotherboardArrayResponse {
    motherboards: Array<Motherboard>
}
