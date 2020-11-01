import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from '../utils/image-upload.utils'
import { Image } from './image.entity'
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
    uploadMultipleFiles(@UploadedFiles() files: Array<File>): Promise<Array<Image>> {
        if (!files) throw new BadRequestException('No images provided')
        return this.imageServise.createImages(files)
    }
}
