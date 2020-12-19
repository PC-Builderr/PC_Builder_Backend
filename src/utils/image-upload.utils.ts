import { BadRequestException } from '@nestjs/common'
import { extname } from 'path'
import { v4 as uuid } from 'uuid'

export const imageFileFilter = (req: Request, { originalname }, callback: Function) => {
    if (!originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        return callback(new BadRequestException('Wrong File Type Provided'), false)
    }
    callback(null, true)
}

export const editFileName = (req: Request, { originalname }, callback: Function) => {
    callback(null, `${uuid()}${extname(originalname)}`)
}
