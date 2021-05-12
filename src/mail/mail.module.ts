import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { join } from 'path'
import { MailConfigService } from 'src/config/mail-config.service'

@Module({
    imports: [
        MailerModule.forRootAsync({
            useClass: MailConfigService
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
