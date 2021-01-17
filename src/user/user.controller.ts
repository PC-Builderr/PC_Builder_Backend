import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { plainToClass, plainToClassFromExist, TransformClassToPlain } from 'class-transformer'
import { AuthJwtGuard } from 'src/auth/guard/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interface/refresh-token-request.interface'
import { UserDetails } from './dto/user-details.dto'
import { UserDetailsResponse } from './interface/user-detailsResponse.interface'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthJwtGuard)
    @Get('account')
    async getUserAccount(@Req() req: AuthenticatedRequest): Promise<UserDetailsResponse> {
        return { userDetails: plainToClassFromExist(new UserDetails(), req.user) }
    }
}
