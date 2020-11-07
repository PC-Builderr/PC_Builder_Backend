import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { Options } from 'src/utils/options.interface'
import { Repository } from 'typeorm'
import { Admin } from './admin.entity'
import { JwtAdminPayoad } from './interface/jwt-admin.interface'

@Injectable()
export class AdminService {
    private options: Options = { relations: ['user'] }

    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        private readonly jwtService: JwtService
    ) {}

    async getAccessByUser(user: User): Promise<string | null> {
        const admin: Admin = await this.adminRepository.findOne({ user }, this.options)
        return admin ? this.signToken(admin.id) : null
    }

    async createAdmin(user: User) {
        const admin: Admin = this.adminRepository.create(user)
        return this.adminRepository.save(admin)
    }

    async getAllAdmins(): Promise<Array<Admin>> {
        const admins: Array<Admin> = await this.adminRepository.find(this.options)
        if (!admins.length) throw new NotFoundException()
        return admins
    }

    private signToken(id: number): string {
        const payload: JwtAdminPayoad = { id }
        return this.jwtService.sign(payload)
    }
}
