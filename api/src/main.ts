import { NestFactory } from '@nestjs/core'
import passport from 'passport'
import { AppModule } from './app.module'
import { JwtStrategy } from './auth/jwt.strategy'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('/api')
    await app.listen(process.env.PORT || 4000)
}
bootstrap()
