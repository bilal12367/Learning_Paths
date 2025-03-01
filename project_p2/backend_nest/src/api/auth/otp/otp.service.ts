import { Inject, Injectable } from '@nestjs/common';
import fs from 'fs'
import nodemailer, { SentMessageInfo } from 'nodemailer'
import { UsersService } from 'src/api/users/users.service';
import { Repository } from 'typeorm';
import { UserOtp } from '../entities/user_otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { JwtService } from 'src/jwt/jwt.service';
import crypto from 'crypto'
import { TestLogger } from 'src/config/logger.config';
import { JwtPayload } from 'jsonwebtoken';
import { UserEmailVerification } from '../entities/user_email_verification.entity';
import { ConfigService } from '@nestjs/config';
import { ISentEmailInfo } from '../auth.types';
import { InvalidTokenException, UserNotFoundException } from 'src/exceptions/auth_exceptions/auth.exceptions';

interface IOtpService {
    sendForgetPasswordOtp(email: string): Promise<ISentEmailInfo>;
    sendVerificationEmail(email: string): Promise<boolean>;
    isEmailVerified(email: number): Promise<boolean>;
}



@Injectable()
export class OtpService implements IOtpService {
    private sendEmail: boolean = false;
    constructor(
        private readonly userService: UsersService,
        @InjectRepository(UserOtp) private readonly userOtpRepository: Repository<UserOtp>,
        @InjectRepository(UserEmailVerification) private readonly emailVerificationRepository: Repository<UserEmailVerification>,
        private readonly jwtService: JwtService,
        private readonly logger: TestLogger,
        private configService: ConfigService
    ) {
        this.sendEmail = (this.configService.get("SEND_EMAIL") == "true")
    }
    async isEmailVerified(userId: number): Promise<boolean> {
        const userEmailVerification: UserEmailVerification = (await this.emailVerificationRepository.findOne({where: {userId: userId}}));
        console.log({userEmailVerification})
        return userEmailVerification.emailVerified
    }

    private async generateOtp(email: string, expiration: Date, type: 'NUMERIC' | 'TOKEN'): Promise<UserOtp> {
        const user = await this.userService.findOne(email);
        await this.userOtpRepository.update({ user_Id: user.id, expired: false }, { expired: true })
        var otp = null
        const otpRecord = {
            otp: null,
            user_Id: user.id,
            otp_type: type,
            otp_expiration: expiration,
            shortened_Token: null,
            expired: false
        }
        if (type == 'NUMERIC') {
            otpRecord.otp = Math.floor(Math.random() * 900000) + 100000;
        } else {
            // 'http://localhost:3000/verify_token/' + 
            var shortened_token = crypto.randomBytes(8).toString('hex');
            otpRecord.otp = this.jwtService.generateToken({ id: user.id.toString() })
            otpRecord.shortened_Token = shortened_token
        }
        const userOtp: UserOtp = await this.userOtpRepository.save(otpRecord)
        userOtp.otp = otp || ('http://localhost:3000/verify_token?token=' + shortened_token)
        return userOtp
    }

    // pass 'brzw xtpc zmkd yomv' 2nd email
    async sendForgetPasswordOtp(email: string): Promise<ISentEmailInfo> {
        try {
            var template = fs.readFileSync('src/assets/html/Forget_Password_Template.html', { encoding: 'utf8', flag: 'r' })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'shkmohammedbilal@gmail.com',
                    pass: 'brzw xtpc zmkd yomv'
                }
            })
            const userOtpRecord = await this.generateOtp(email, new Date(Date.now() + (5 * 60 * 1000)), 'NUMERIC')
            // Replace placeholders in the template
            const htmlContent = template
                .replace('{{otp}}', userOtpRecord.otp.toString());


            let mailOptions = {
                from: 'user.test@example.com',
                to: email,
                subject: 'Test OTP Email',
                html: htmlContent
            };
            var info: ISentEmailInfo;
            if (this.sendEmail) {
                this.logger.log("Sending Real Email: " + email)
                const emailInfo: SentMessageInfo = await transporter.sendMail(mailOptions);
                info = {
                    success: emailInfo.emailTransportInfo.success,
                    email: emailInfo.emailTransportInfo.email,
                    error: false,
                    message: emailInfo.emailTransportInfo.message,
                    messageId: emailInfo.emailTransportInfo.messageId
                }
            } else {
                this.logger.log("Not Sending Real Email")
                info = {
                    success: true,
                    email,
                    error: false,
                    message: 'Email Sent Successfully: (Not Sent)',
                    messageId: crypto.randomBytes(64).toString('hex')
                }

            }
            return info
        } catch (err) {
            return {
                success: false,
                email,
                error: true,
                messageId: '',
                message: "Error while sending forget password email!!!"
            }
        }

    }


    async sendVerificationEmail(email: string): Promise<SentMessageInfo> {
        try {
            var template = fs.readFileSync('src/assets/html/Verification_Email_Template.html', { encoding: 'utf8', flag: 'r' })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'shkmohammedbilal@gmail.com',
                    pass: 'brzw xtpc zmkd yomv'
                }
            })
            const userOtpRecord = await this.generateOtp(email, new Date(Date.now() + (5 * 60 * 1000)), 'TOKEN')

            // Replace placeholders in the template
            const htmlContent = template
                .replace('{{otp}}', userOtpRecord.otp.toString());

            let mailOptions: Mail.Options = {
                from: 'user.test@example.com',
                to: email,
                subject: 'Test OTP Email',
                html: htmlContent,
                attachments: [
                    {
                        filename: 'discord_logo_blue.png',
                        path: './src/assets/images/discord_logo_blue.png',
                        cid: 'logo1'
                    }
                ]
            };
            var info: any = {}
            if (this.sendEmail) {
                info = await transporter.sendMail(mailOptions);
                info = { ...info, success: true, message: "Email Sent Successfully!" }
            } else {
                info = { ...info, success: true, message: "Email Not Sent Flag Intentionally", response: "Dummy Email Sent Record" }
            }
            this.logger.log("Email Sent: " + JSON.stringify(info))
            await this.emailVerificationRepository.save({
                emailInfo: info.response || 'Dummy Email',
                emailVerified: false,
                otpId: userOtpRecord.id,
                userId: userOtpRecord.user_Id,
            })
            return info
        } catch (error) {
            this.logger.error("Sending Email Failed to: " + email)
            this.logger.error(error)
            return {
                success: false,
                error: true,
                message: "Error while sending verification Email!!!"
            }
        }
    }

    async emailVerification(token: string): Promise<JwtPayload> {
        const userOtp = await this.userOtpRepository.findOne({ where: { shortened_Token: token } })
        if (userOtp == null) {
            throw new InvalidTokenException()
        }
        const payload: JwtPayload = this.jwtService.verifyToken(userOtp.otp);
        this.logger.customLog("Email Verified: " + JSON.stringify(payload), 'EmailVerification')
        if (!await this.userService.existsById(payload.id)) {
            throw new UserNotFoundException()
        }
        await this.emailVerificationRepository.update({ otpId: userOtp.id }, { emailVerified: true })
        payload.verified = true
        return payload
    }
}
