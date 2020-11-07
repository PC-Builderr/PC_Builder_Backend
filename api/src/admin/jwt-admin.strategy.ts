import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ADMIN } from 'src/utils/constants'
import { Repository } from 'typeorm'
import { Admin } from './admin.entity'
import { JwtAdminPayoad } from './interface/jwt-admin.interface'

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, ADMIN) {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('adminToken'),
            secretOrKey: process.env.JWT_ADMIN
        })
    }

    async validate(payload: JwtAdminPayoad): Promise<Admin> {
        const admin: Admin = await this.adminRepository.findOne(payload.id)
        if (!admin) throw new UnauthorizedException()
        return admin
    }
}
