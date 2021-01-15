import { Request } from 'express'
import { User } from 'src/user/entity/user.entity'

export interface AuthenticatedRequest extends Request {
    user: User
}
