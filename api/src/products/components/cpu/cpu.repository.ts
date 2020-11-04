import { EntityRepository, Repository } from 'typeorm';
import { CPU } from './cpu.entity';

@EntityRepository(CPU)
export class CPURepository extends Repository<CPU> {}