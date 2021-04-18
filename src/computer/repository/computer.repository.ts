import { NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Computer } from '../entity/computer.entity'

@EntityRepository(Computer)
export class ComputerRepository extends Repository<Computer> {
    async findByProductId(productId: number): Promise<Computer> {
        const computer: Computer = await this.createQueryBuilder('computer')
            .leftJoinAndSelect('computer.product', 'product')

            .leftJoinAndSelect('computer.cpu', 'cpu')
            .leftJoinAndSelect('cpu.product', 'cpu_product')

            .leftJoinAndSelect('computer.motherboard', 'motherboard')
            .leftJoinAndSelect('motherboard.product', 'motherboard_product')

            .leftJoinAndSelect('computer.chassis', 'chassis')
            .leftJoinAndSelect('chassis.product', 'chassis_product')

            .leftJoinAndSelect('computer.psu', 'psu')
            .leftJoinAndSelect('psu.product', 'psu_product')

            .leftJoinAndSelect('computer.gpu', 'gpu')
            .leftJoinAndSelect('gpu.product', 'gpu_product')

            .leftJoinAndSelect('computer.ram', 'ram')
            .leftJoinAndSelect('ram.product', 'ram_product')

            .leftJoinAndSelect('computer.storages', 'storages')
            .leftJoinAndSelect('storages.storage', 'storage')
            .leftJoinAndSelect('storage.product', 'storage_product')

            .where('product.id = :productId', { productId })
            .getOne()

        if (!computer) {
            throw new NotFoundException()
        }

        return computer
    }
}
