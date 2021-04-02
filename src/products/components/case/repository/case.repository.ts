import { EntityRepository } from 'typeorm'
import { FindComponentRepository } from '../../find-component.repository'
import { Case } from '../entity/case.entity'
import { CaseFormat } from '../interfaces/case-format.interface'

@EntityRepository(Case)
export class CaseRepository extends FindComponentRepository<Case> {
    protected createConditionForComponentKey(key: string): string {
        if (key === 'format' || key === 'series') {
            return `component.${key} IN (:...${key})`
        }
        return super.createConditionForComponentKey(key)
    }

    async findCaseFormats(): Promise<string[]> {
        const formats: CaseFormat[] = await this.createQueryBuilder('case')
            .select('DISTINCT case.format')
            .getRawMany<CaseFormat>()

        return formats.map((format: CaseFormat) => format?.format)
    }
}
