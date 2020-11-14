import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get(':id')
    getAdminTokenByUserId(@Param('id', ParseIntPipe) id: number) {
        return this.adminService.getAccessByUserId(id)
    }
}
