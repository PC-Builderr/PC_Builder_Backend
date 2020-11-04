import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Admin } from './admin.entity'
import { JwtAdminPayoad } from './jwt-admin.interface'
import { AdminRepository } from './admin.repository'

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'Admin') {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository
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
