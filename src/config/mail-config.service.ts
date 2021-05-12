import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path'
import { createTestAccount, TestAccount } from 'nodemailer'

export class MailConfigService implements MailerOptionsFactory {
    async createMailerOptions(): Promise<MailerOptions> {
        const account: TestAccount = await createTestAccount()
        return {
            transport: {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>'
            },
            template: {
                dir: join(__dirname, '..', 'mail', 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            }
        }
    }
}
