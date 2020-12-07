import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.enableCors()
    await app.listen(process.env.PORT || 4000)
}
bootstrap()
