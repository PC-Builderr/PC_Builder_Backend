import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entity/user.entity'
import { Repository } from 'typeorm'
import { Admin } from './entity/admin.entity'

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) {}

    create(user: User) {
        const admin: Admin = this.adminRepository.create({ user })

        return this.adminRepository.save(admin)
    }

    async findByUserId(id: number) {
        const admin: Admin = await this.adminRepository.findOne({ where: { userId: id } })

        if (!admin) {
            throw new UnauthorizedException()
        }
        return admin
    }
}
