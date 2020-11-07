import { BadRequestException } from '@nestjs/common'

export const errorHandler = error => {
    switch (error.code) {
        // case '23505':
        //     throw new BadRequestException()
        default:
            throw error
    }
}
