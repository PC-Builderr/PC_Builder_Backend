import { IsPositive, IsString, Matches, ValidateIf } from 'class-validator'

export class CreateCPUDto {
    @IsPositive()
    productId: number

    @IsString()
    model: string

    @IsString()
    generation: string

    @IsString()
    series: string

    @IsString()
    socket: string

    @IsPositive()
    core: number

    @IsPositive()
    thread: number

    @IsPositive()
    speed: number

    @IsPositive()
    turboSpeed: number

    @IsPositive()
    ramCapacity: number

    @IsPositive()
    maxRamSpeed: number

    @IsPositive()
    ramChannels: number

    @IsString()
    ramType: string

    @IsString()
    cache: string

    @ValidateIf((_, integratedGraphics: string) => Boolean(integratedGraphics))
    @IsString()
    integratedGraphics?: string

    @IsPositive()
    consumption: number
}
