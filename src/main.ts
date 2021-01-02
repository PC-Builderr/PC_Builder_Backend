import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as rateLimit from 'express-rate-limit'
import { AppModule } from './app.module'
import { ONE_MINUTE_IN_MILISECONDS } from './utils/constants'

const bootstrap = async () => {
    const app: INestApplication = await NestFactory.create(AppModule)
    app.enableCors()
    // app.use(
    //     rateLimit({
    //         windowMs: ONE_MINUTE_IN_MILISECONDS * 15,
    //         max: 100
    //     })
    // )
    app.setGlobalPrefix('api')
    await app.listen(process.env.PORT || 4000)
}
bootstrap()
