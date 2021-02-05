import { IsNotEmpty, IsPositive, IsString, ValidateIf, ValidateNested } from 'class-validator'

export class Component {
    @IsPositive()
    productId: number

    @IsPositive()
    quantity: number
}

export class CreateComputerDto {
    @IsString()
    name: string

    @IsPositive()
    cpuId: number

    @ValidateIf((_, gpu: Component | undefined) => Boolean(gpu))
    @ValidateNested()
    gpu?: Component

    @ValidateNested()
    ram: Component

    @IsPositive()
    motherboardId: number

    @IsNotEmpty()
    storages: Component[]

    @IsPositive()
    caseId: number

    @IsPositive()
    psuId: number
}
