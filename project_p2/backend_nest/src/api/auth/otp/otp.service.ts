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

interface IOtpService {
    sendForgetPasswordOtp(email: string): Promise<boolean>;
    sendVerificationEmail(email: string): Promise<boolean>;
}

@Injectable()
export class OtpService implements IOtpService {

    constructor(
        private readonly userService: UsersService,
        @InjectRepository(UserOtp) private readonly userOtpRepository: Repository<UserOtp>,
        private readonly jwtService: JwtService,
        private readonly logger: TestLogger
    ) { }

    private async generateOtp(email: string, expiration: Date, type: 'NUMERIC' | 'TOKEN'): Promise<string> {
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
        await this.userOtpRepository.save(otpRecord)
        return otp || ('http://localhost:3000/verify_token?token=' + shortened_token)
    }

    // pass 'brzw xtpc zmkd yomv' 2nd email
    async sendForgetPasswordOtp(email: string): Promise<boolean> {
        try {
            var template = fs.readFileSync('src/assets/html/Forget_Password_Template.html', { encoding: 'utf8', flag: 'r' })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'shkmohammedbilal@gmail.com',
                    pass: 'brzw xtpc zmkd yomv'
                }
            })
            const otp = await this.generateOtp(email, new Date(Date.now() + (5 * 60 * 1000)), 'NUMERIC')
            // Replace placeholders in the template
            const htmlContent = template
                .replace('{{otp}}', otp.toString());


            let mailOptions = {
                from: 'user.test@example.com',
                to: email,
                subject: 'Test OTP Email',
                html: htmlContent
            };

            const info = await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return true
        } catch (err) {
            return false
        }

    }


    async sendVerificationEmail(email: string): Promise<SentMessageInfo> {
        try {
            var template = fs.readFileSync('src/assets/html/Forget_Password_Template.html', { encoding: 'utf8', flag: 'r' })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'shkmohammedbilal@gmail.com',
                    pass: 'brzw xtpc zmkd yomv'
                }
            })
            const otp = await this.generateOtp(email, new Date(Date.now() + (5 * 60 * 1000)), 'TOKEN')
            // Replace placeholders in the template
            const htmlContent = template
                .replace('{{otp}}', otp.toString());

            let mailOptions = {
                from: 'user.test@example.com',
                to: email,
                subject: 'Test OTP Email',
                html: htmlContent
            };
            const info = await transporter.sendMail(mailOptions);
            this.logger.log("Email Sent: "+info)
            return info
        } catch (error) {
            this.logger.error("Sending Email Failed to: "+ email)
            this.logger.error(error)
            return false
        }
    }

    async emailVerification(token: string): Promise<boolean> {
        const userOtp = await this.userOtpRepository.findOne({ where: { shortened_Token: token } })
        const payload = this.jwtService.verifyToken(userOtp.otp);
        if(!await this.userService.existsById(payload.id)) {
            throw new Error("Email Verification Failed")
        }
        return true
    }
}
