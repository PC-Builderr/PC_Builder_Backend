import { IsPositive, ValidateIf, ValidateNested } from 'class-validator'

class Component {
    @IsPositive()
    productId: number

    @IsPositive()
    quantity: number
}

export class CreateComputerDto {
    @IsPositive()
    cpuId: number

    @ValidateIf((_, gpu: Component | undefined) => Boolean(gpu))
    @ValidateNested()
    gpu?: Component

    @ValidateNested()
    ram: Component

    @IsPositive()
    motherboardId: number

    @IsPositive()
    storageId: number

    @IsPositive()
    caseId: number

    @IsPositive()
    psuId: number
}
