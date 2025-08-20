import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { Transport } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import path from 'path'
import fs from 'fs';

@Injectable()
export class EmailService {
    private readonly logger: Logger = new Logger(EmailService.name);
    private transporter: nodemailer.Transporter;

    constructor() {}

    async onModuleInit() {
        const account = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user,
                pass: account.pass, // your email password
            },
        });
    }
    private getHtmlFromFile(templateName: string): string {
        const filePath = path.join(__dirname, '..', 'assets','html','template', `${templateName}.html`);
        return fs.readFileSync(filePath, 'utf8');
    }
    async sendEmail(email: string, token: string): Promise<any> {
        try {
            var html = this.getHtmlFromFile('Verification_Email')
            html = html.replace('{{verificationLink}}', process.env.VERIFICATION_EMAIL_LINK + '?token='+token || 'http://localhost:3000/verify?token='+token);
            this.logger.log("HTML Content: ", html);
            const mailOptions: MailOptions = {
                from: 'sk.bilal.md@gmail.com',
                to: email,
                subject: "Verification Email",
                html: html}
            const info = await this.transporter.sendMail(mailOptions)
            this.logger.log(`Email sent: ${info.messageId}`);
            this.logger.log("Info: ", info);
            info.link = nodemailer.getTestMessageUrl(info);
            this.logger.log("Preview URL: ", info.link);
            return info;
        } catch (error) {
            this.logger.error('Error sending email:', error);
            throw error;
        }  
    }
}
