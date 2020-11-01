import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthUserDto, CreateUserDto, JwtResponse } from './user.model'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<JwtResponse> {
        const token: string = await this.userService.createUser(createUserDto)
        return { token }
    }

    @Post('login')
    async login(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<JwtResponse> {
        const token: string = await this.userService.login(authUserDto)
        return { token }
    }
}
