import { User } from 'src/user/user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { Admin } from './admin.entity'

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
    getAccessByUser(user: User): Promise<Admin> {
        return this.findOne({ user }, { relations: ['user'] })
    }
    createAdmin(user: User): Promise<Admin> {
        const admin: Admin = new Admin()
        admin.user = user
        return this.save(admin)
    }
    getAdminById(id: number): Promise<Admin> {
        return this.findOne(id, { relations: ['user'] })
    }
}
