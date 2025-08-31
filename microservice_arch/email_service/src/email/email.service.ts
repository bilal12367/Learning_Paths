import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { TestAccount, Transport } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import path from 'path'
import fs from 'fs';

@Injectable()
export class EmailService {
    private readonly logger: Logger = new Logger(EmailService.name);
    private transporter: nodemailer.Transporter;

    constructor() {}

    async onModuleInit() {
        try {

            var account: any = {
                smtp: { host: 'smtp.gmail.com', port: 465 , secure: true },
                user: process.env.GMAIL_APP_USER_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
            if(process.env.SEND_REAL_EMAIL !== "true") {
                this.logger.log("Sending Fake Email!!")
                account = await nodemailer.createTestAccount();
            }
            this.logger.warn(account);
            this.transporter = await nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure, // true for 465, false for other ports
                auth: {
                    user: account.user,
                    pass: account.pass, // your email password
                },
            });
            this.logger.log("Email Service Connected, User Account: ")
            this.logger.log(account)
            
        } catch (error) {
            this.logger.error("Failed to initialize Email Transporter: Email Service")
            this.logger.error("Error Obj: "+JSON.stringify(error))
            this.logger.error("Error:",error.message)
        }
        
    }
    private getHtmlFromFile(templateName: string): string {
        const filePath = path.join(__dirname, '..', 'assets','html','template', `${templateName}.html`);
        return fs.readFileSync(filePath, 'utf8');
    }
    async sendEmail(email: string, token: string): Promise<any> {
        this.logger.debug("Sending Email:")
        this.logger.debug({email, token})
        try {
            var html = this.getHtmlFromFile('Verification_Email')
            html = html.replace('{{verificationLink}}', process.env.VERIFICATION_EMAIL_LINK + '?token='+token || 'http://localhost:3000/verify?token='+token);
            
            const mailOptions: MailOptions = {
                from: 'shkmohammedbilal@gmail.com',
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
