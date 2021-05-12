import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ORDER_STATUS } from 'src/utils/constants'

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(email: string, name: string, status: ORDER_STATUS) {
        await this.mailerService.sendMail({
            to: email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './new-status', // `.hbs` extension is appended automatically
            context: {
                name,
                status
            }
        })
    }
}
