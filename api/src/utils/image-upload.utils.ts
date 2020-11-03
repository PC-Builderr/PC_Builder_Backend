import { extname } from 'path'
import { BadRequestException } from '@nestjs/common'

export const imageFileFilter = (req, { originalname }, callback) => {
    if (!originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false)
    }
    callback(null, true)
}

export const editFileName = (req, { originalname }, callback) => {
    const [name] = originalname.split('.')
    const fileExtName = extname(originalname)
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 10).toString(10))
        .join('')
    callback(null, `${name}${randomName}${fileExtName}`)
}
