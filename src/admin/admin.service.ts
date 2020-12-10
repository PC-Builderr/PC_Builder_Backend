import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { Admin } from './admin.entity'

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) {}

    create(user: User) {
        const admin: Admin = this.adminRepository.create(user)
        return this.adminRepository.save(admin)
    }

    async findByEmail(email: string) {
        const admin: Admin = await this.adminRepository
            .createQueryBuilder('admin')
            .leftJoinAndSelect('admin.user', 'user')
            .where('user.email =:email', { email })
            .getOne()
        if (!admin) throw new UnauthorizedException()
        return admin
    }
}
