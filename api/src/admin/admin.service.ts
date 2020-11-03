import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { Admin } from './admin.entity'
import { JwtAdminPayoad } from './admin.models'
import { AdminRepository } from './admin.repository'

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository,
        private readonly jwtService: JwtService
    ) {}

    async getAccessByUser(user: User): Promise<string | null> {
        const admin: Admin = await this.adminRepository.getAccessByUser(user)
        return admin ? this.signToken(admin.id) : null
    }

    private signToken(id: number): string {
        const payload: JwtAdminPayoad = { id }
        return this.jwtService.sign(payload)
    }

    createAdmin(user: User) {
        return this.adminRepository.createAdmin(user)
    }
    getAllAdmins() {
        return this.adminRepository.find({ relations: ['user'] })
    }
}
