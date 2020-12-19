import { Case } from 'src/products/components/case/entity/case.entity'
import { CPU } from 'src/products/components/cpu/entity/cpu.entity'
import { GPU } from 'src/products/components/gpu/entity/gpu.entity'
import { Motherboard } from 'src/products/components/motherboard/entity/motherboard.entity'
import { PSU } from 'src/products/components/psu/entity/psu.entity'
import { RAM } from 'src/products/components/ram/entity/ram.entity'
import { Storage } from 'src/products/components/storage/entity/storage.entity'

interface Component<T> {
    product: T
    quantity: number
}

export interface ComputerParts {
    cpu: CPU
    gpu?: Component<GPU>
    motherboard: Motherboard
    chassis: Case
    psu: PSU
    storages: Storage[]
    ram: Component<RAM>
}
