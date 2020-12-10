import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface'
import { ADMIN } from 'src/utils/constants'
import { Admin } from '../../admin/admin.entity'
import { AdminService } from '../../admin/admin.service'

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, ADMIN) {
    constructor(private readonly adminService: AdminService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: JwtPayload): Promise<Admin> {
        return this.adminService.findByEmail(payload?.user?.email)
    }
}
