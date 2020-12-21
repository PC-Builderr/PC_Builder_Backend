import { EntityRepository, Repository } from 'typeorm'
import { Computer } from '../entity/computer.entity'

@EntityRepository(Computer)
export class ComputerRepository extends Repository<Computer> {}
