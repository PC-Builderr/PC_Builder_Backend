import { Case } from '../case.entity'

export interface CaseResponse {
    foundCase: Case
}
export interface CaseArrayResponse {
    cases: Array<Case>
}
