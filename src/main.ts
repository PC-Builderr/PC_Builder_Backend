import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

const bootstrap = async () => {
    const app: INestApplication = await NestFactory.create(AppModule)
    app.enableCors({
        credentials: true,
        origin: [process.env.FRONT_END_ORIGIN, /(www|http:|https:)+[^\s]+[\w]/]
    })
    // app.use(
    //     rateLimit({
    //         windowMs: ONE_MINUTE_IN_MILISECONDS,
    //         max: 100
    //     })
    // )
    app.use(cookieParser())
    app.setGlobalPrefix('api')
    await app.listen(process.env.PORT || 4000)
}
bootstrap()
