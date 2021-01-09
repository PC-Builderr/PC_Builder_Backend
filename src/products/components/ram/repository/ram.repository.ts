import { BadRequestException } from '@nestjs/common'
import { EntityRepository, ObjectLiteral } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { RAM } from '../entity/ram.entity'

@EntityRepository(RAM)
export class RAMRepository extends FindComponentRepository<RAM> {}

// ;['type', 'voltage', 'speed', 'capacity']
