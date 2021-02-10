import { BadRequestException, Injectable } from '@nestjs/common'
import { PSU } from 'src/products/components/psu/entity/psu.entity'
import { Storage } from 'src/products/components/storage/entity/storage.entity'
import { FORMAT_TYPES } from 'src/utils/constants'
import { Computer } from './entity/computer.entity'
import { ComputerStorage } from './entity/storage-quantity.entity'
import { ComputerParts } from './interface/computer-parts.interface'

@Injectable()
export class CompatibilityService {
    verifyCompatibility(computer: Computer) {
        const consumption: number = this.calculateConsumption(computer)

        this.verifyNoDedicatedGPUCompatibility(computer)
        this.verifyFormatCompatibility(computer)
        this.verifyRamTypeCompatibility(computer)
        this.verifyRamQuantityCompatibility(computer)
        this.verifySocketCompatibility(computer)
        this.verifyStorageCompatibility(computer)
        this.verifyPSUPowerOutput(consumption, computer.psu)
    }

    private calculateConsumption(computer: Computer) {
        const { cpu, storages, ram, ramQuantity, gpu, gpuQuantity, motherboard } = computer

        let consumption: number =
            cpu.consumption + ram.consumption * ramQuantity + motherboard.consumption

        consumption += storages.reduce(
            (consumption: number, computerStorage: ComputerStorage): number => {
                return consumption + computerStorage.quantity * computerStorage.storage.consumption
            },
            0
        )

        if (gpu) {
            consumption += gpuQuantity * gpu.consumption
        }

        return consumption
    }

    private verifyNoDedicatedGPUCompatibility({ gpu, cpu }: Computer) {
        if (!cpu.integratedGraphics && !gpu) {
            throw new BadRequestException('No Integrated Or Dedicated Graphics')
        }
    }

    private verifySocketCompatibility({ cpu, motherboard }: Computer) {
        if (cpu.socket !== motherboard.socket) {
            throw new BadRequestException('Socket Not Compatible')
        }
    }

    private verifyRamTypeCompatibility({ cpu, motherboard, ram }: Computer) {
        if (ram.type !== cpu.ramType || ram.type !== motherboard.ramType) {
            throw new BadRequestException('Ram Type Not Compatible')
        }
    }

    private verifyRamQuantityCompatibility({ cpu, motherboard, ram, ramQuantity }: Computer) {
        if (ramQuantity > motherboard.ramSlots || ramQuantity > cpu.ramChannels * 2) {
            throw new BadRequestException('Ram Quantity Not Compatible With CPU/Motherboard')
        }
        if (
            ramQuantity * ram.capacity > motherboard.ramCapacity ||
            ramQuantity * ram.capacity > cpu.ramCapacity
        ) {
            throw new BadRequestException('Ram Size Not Compatible With CPU/Motherboard')
        }
    }

    private verifyFormatCompatibility({ chassis, motherboard, gpu }: Computer) {
        let maxFormatValue = FORMAT_TYPES.get(chassis.format)

        if (FORMAT_TYPES.get(motherboard.format) > maxFormatValue) {
            throw new BadRequestException('Format Not Compatible')
        }

        if (gpu && FORMAT_TYPES.get(gpu.format) > maxFormatValue) {
            throw new BadRequestException('Format Not Compatible')
        }
    }

    private verifyStorageCompatibility({ storages, motherboard }: Computer) {
        const storageQuantities: Map<string, number> = this.getStorageQuantities(storages)

        if (motherboard.m2Ports < storageQuantities.get('М.2 NVMe')) {
            throw new BadRequestException('Not Enough M.2 NVMe Slots')
        }

        if (motherboard.sataPorts < storageQuantities.get('SATA')) {
            throw new BadRequestException('Not Enough SATA Prots')
        }
    }

    private getStorageQuantities(storages: ComputerStorage[]): Map<string, number> {
        const storageQuantities: Map<string, number> = new Map()

        storages.forEach(({ storage }: ComputerStorage) => {
            if (!storageQuantities.has(storage.type)) {
                storageQuantities.set(storage.type, 1)
                return
            }

            storageQuantities.set(storage.type, storageQuantities.get(storage.type) + 1)
        })

        return storageQuantities
    }

    private verifyPSUPowerOutput(consumption: number, psu: PSU) {
        if (consumption > (psu.power * psu.efficiency) / 100) {
            throw new BadRequestException('PSU Not Powerful Enough')
        }
    }
}
