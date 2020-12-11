import { extname } from 'path'
import { BadRequestException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

export const imageFileFilter = (req: Request, { originalname }, callback: Function) => {
    if (!originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        return callback(new BadRequestException(), false)
    }
    callback(null, true)
}

export const editFileName = (req: Request, { originalname }, callback: Function) => {
    const [name]: string = originalname.split('.')
    const fileExtName: string = extname(originalname)
    const randomName: string = uuid()
    callback(null, `${randomName}${fileExtName}`)
}
