import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from '../utils/image-upload.utils'
import { ImageArrayResponse } from './image.model'
import { ImageService } from './image.service'

@Controller('image')
export class ImageController {
    constructor(private readonly imageServise: ImageService) {}

    @Get(':url')
    getImage(@Param('url') image, @Res() res): void {
        res.sendFile(image, { root: 'uploads' })
    }

    @Post('')
    @UseInterceptors(
        FilesInterceptor('image', 10, {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName
            }),
            fileFilter: imageFileFilter
        })
    )
    async uploadMultipleFiles(@UploadedFiles() files: Array<any>): Promise<ImageArrayResponse> {
        if (!files) throw new BadRequestException('No images provided')
        const images = await this.imageServise.createImages(files)
        return { images }
    }
}
