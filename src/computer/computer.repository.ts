import { EntityRepository, Repository } from 'typeorm'
import { Computer } from './computer.entity'

@EntityRepository(Computer)
export class ComputerRepository extends Repository<Computer> {}
