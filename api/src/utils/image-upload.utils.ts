import { extname } from 'path'
import { BadRequestException } from '@nestjs/common'

export const imageFileFilter = (req: Request, { originalname }, callback: Function) => {
    if (!originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false)
    }
    callback(null, true)
}

export const editFileName = (req: Request, { originalname }, callback: Function) => {
    const [name]: string = originalname.split('.')
    const fileExtName: string = extname(originalname)
    const randomName: string = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 10).toString(10))
        .join('')
    callback(null, `${name}${randomName}${fileExtName}`)
}
