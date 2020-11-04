import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CPURepository } from './cpu.repository'

@Injectable()
export class CPUService {
    constructor(
        @InjectRepository(CPURepository)
        private readonly cpuRepository: CPURepository
    ) {}
}
