import { BadRequestException, Injectable } from '@nestjs/common'
import { PSU } from 'src/products/components/psu/entity/psu.entity'
import { Storage } from 'src/products/components/storage/entity/storage.entity'
import { FORMAT_TYPES } from 'src/utils/constants'
import { ComputerParts } from './interface/computer-parts.interface'

@Injectable()
export class CompatibilityService {
    verifyCompatibility(computerParts: ComputerParts) {
        const consumption: number = this.calculateConsumption(computerParts)

        this.verifyNoDedicatedGPUCompatibility(computerParts)
        this.verifyFormatCompatibility(computerParts)
        this.verifyRamTypeCompatibility(computerParts)
        this.verifyRamQuantityCompatibility(computerParts)
        this.verifySocketCompatibility(computerParts)
        this.verifyStorageCompatibility(computerParts)
        this.verifyPSUPowerOutput(consumption, computerParts.psu)
    }

    private calculateConsumption(computerParts: ComputerParts): number {
        const consumption: number = Object.keys(computerParts).reduce(
            (consumption: number, key: string): number => {
                if (key === 'psu' || key === 'chassis') return
                if (key === 'storages') {
                    return consumption + this.calculateStoragesConsumption(computerParts.storages)
                }
                if (key === 'ram' || key === 'gpu') {
                    return (
                        consumption +
                        computerParts[key].product.consumption * computerParts[key].quantity
                    )
                }
                return consumption + computerParts[key].consumption
            },
            0
        )
        return consumption
    }

    private calculateStoragesConsumption(storages: Storage[]): number {
        return storages.reduce(
            (consumption: number, storage: Storage): number => consumption + storage.consumption,
            0
        )
    }

    private verifyNoDedicatedGPUCompatibility({ gpu, cpu }: ComputerParts) {
        if (!cpu.integratedGraphics && !gpu)
            throw new BadRequestException('No Integrated Or Dedicated Graphics')
    }

    private verifySocketCompatibility({ cpu, motherboard }: ComputerParts) {
        if (cpu.socket !== motherboard.socket)
            throw new BadRequestException('Socket Not Compatible')
    }

    private verifyRamTypeCompatibility({ cpu, motherboard, ram }: ComputerParts) {
        if (ram.product.type !== cpu.ramType || ram.product.type !== motherboard.ramType)
            throw new BadRequestException('Ram Type Not Compatible')
    }

    private verifyRamQuantityCompatibility({ cpu, motherboard, ram }: ComputerParts) {
        if (ram.quantity > motherboard.ramSlots || ram.quantity > cpu.ramChannels * 2)
            throw new BadRequestException('Ram Quantity Not Compatible With CPU/Motherboard')
        if (
            ram.quantity * ram.product.capacity > motherboard.ramCapacity ||
            ram.quantity * ram.product.capacity > cpu.ramCapacity
        )
            throw new BadRequestException('Ram Size Not Compatible With CPU/Motherboard')
    }

    private verifyFormatCompatibility({ chassis, motherboard, gpu }: ComputerParts) {
        let maxFormatValue = FORMAT_TYPES.get(chassis.format)

        if (FORMAT_TYPES.get(motherboard.format) > maxFormatValue)
            throw new BadRequestException('Format Not Compatible')

        if (gpu && FORMAT_TYPES.get(gpu.product.format) > maxFormatValue)
            throw new BadRequestException('Format Not Compatible')
    }

    private verifyStorageCompatibility({ storages, motherboard }: ComputerParts) {
        const storageQuantities: Map<string, number> = new Map()
        storages.forEach((storage: Storage) => {
            if (!storageQuantities.has(storage.type)) {
                storageQuantities.set(storage.type, 1)
                return
            }
            storageQuantities.set(storage.type, storageQuantities.get(storage.type) + 1)
        })

        if (motherboard.m2Ports < storageQuantities.get('М.2 NVMe'))
            throw new BadRequestException('Not Enough M.2 NVMe Slots')

        if (motherboard.sataPorts < storageQuantities.get('SATA'))
            throw new BadRequestException('Not Enough SATA Prots')
    }

    private verifyPSUPowerOutput(consumption: number, psu: PSU) {
        if (consumption > (psu.power * psu.efficiency) / 100)
            throw new BadRequestException('PSU Not Powerful Enough')
    }
}
