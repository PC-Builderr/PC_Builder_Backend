import { Request } from 'express'
import { User } from 'src/user/entity/user.entity'

export interface RefreshTokenRequest extends Request {
    user: User
}
