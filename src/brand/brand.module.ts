import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandController } from './brand.controller'
import { BrandService } from './brand.service'
import { BrandRepository } from './repository/brand.repository'

@Module({
    imports: [TypeOrmModule.forFeature([BrandRepository])],
    providers: [BrandService],
    controllers: [BrandController],
    exports: [BrandService]
})
export class BrandModule {}
