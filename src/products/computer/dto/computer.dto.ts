import { IsIn, IsPositive, IsString, Matches } from 'class-validator'
import { FORMAT_TYPES, RAM_TYPE } from 'src/utils/constants'

export class CreateComputerDto {
    @IsPositive()
    cpuId: number

    @IsPositive()
    gpuId: number

    @IsPositive()
    ramId: number

    @IsPositive()
    motherboardId: number

    @IsPositive()
    storageId: number

    @IsPositive()
    caseId: number

    @IsPositive()
    psuId: number
}
