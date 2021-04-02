import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { CPU } from '../entity/cpu.entity'
import { CPUGeneration } from '../interfaces/cpu-generation.interface'
import { Series } from '../../series.interface'

const biggerOrEqualFields: string[] = ['ramCapacity', 'ramChannels', 'maxRamSpeed']

@EntityRepository(CPU)
export class CPURepository extends FindComponentRepository<CPU> {
    protected createConditionForComponentKey(key: string): string {
        if (key === 'series' || key === 'generation') {
            return `component.${key} IN (:...${key})`
        }
        if (biggerOrEqualFields.includes(key)) {
            return `component.${key} >= :${key}`
        }
        if (key === 'integratedGraphics') {
            return 'component.integratedGraphics IS NOT NULL'
        }
        return super.createConditionForComponentKey(key)
    }

    async findCPUGenerations(): Promise<string[]> {
        const generations: CPUGeneration[] = await this.createQueryBuilder('cpu')
            .select('DISTINCT cpu.generation')
            .getRawMany<CPUGeneration>()

        console.log(generations)

        return generations.map((gen: CPUGeneration) => gen?.generation)
    }
}
