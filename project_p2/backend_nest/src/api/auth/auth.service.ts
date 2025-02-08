import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { ForgetUserDto, IUserToken } from './auth.types';
import { LoginUserDto } from './dto/login.dto';
import { genSalt, hash, compare } from 'bcryptjs'
import { PasswordMismatchException, UserAlreadyExistsException, UserNotFoundException } from 'src/exceptions/auth_exceptions/auth.exceptions';
import { RegisterUserDto } from './dto/register.dto';
import nodemailer from 'nodemailer'
import fs from 'fs'
import { Repository } from 'typeorm';
import { UserOtp } from './entities/user_otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TestLogger } from 'src/config/logger.config';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserOtp) private readonly userOtpRepository: Repository<UserOtp>, private readonly userService: UsersService, private readonly jwtService: JwtService,private readonly logger: TestLogger) { }

  async registerUser(createUserDto: RegisterUserDto): Promise<IUserToken> {
    if (await this.userService.exists(createUserDto.email)) {
      throw new UserAlreadyExistsException()
    }
    this.logger.log(createUserDto)
    console.log("Hello")
    createUserDto.password = await this.hashPassword(createUserDto.password)
    const regUser = await this.userService.create(createUserDto);
    const token = this.jwtService.generateToken({ id: regUser.id.toString() })
    return { email: regUser.email, isActive: regUser.isActive, token }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<IUserToken> {
    const user = await this.userService.findOne(loginUserDto.email);
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.comparePassword(user.password, loginUserDto.password)
    const token = this.jwtService.generateToken({ id: user.id.toString() });
    return { email: loginUserDto.email, token, isActive: user.isActive }
  }
  // pass 'brzw xtpc zmkd yomv' 2nd email
  async forgetUser(forgetUserDto: ForgetUserDto) {
    fs.readFile('src/assets/html/Forget_Password_Template.html', 'utf-8', async (err, template) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '',
          pass: ''
        }
      })
      if (err) {
        console.error('Error reading template:', err);
        return;
      }
      const user = await this.userService.findOne(forgetUserDto.email);
      const otp = Math.floor(Math.random() * 900000) + 100000;
      await this.userOtpRepository.save({
        otp: otp.toString(),
        user_Id: user.id,
      })
      // Replace placeholders in the template
      const htmlContent = template
        .replace('{{otp}}', otp.toString());


      let mailOptions = {
        from: 'user.test@example.com',
        to: '',
        subject: 'Test OTP Email',
        html: htmlContent
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });

  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(7)
    const hashPassword = await hash(password, salt);
    return hashPassword;
  }

  async comparePassword(hashedPassword: string, password: string): Promise<boolean> {
    if (!await compare(password, hashedPassword)) {
      throw new PasswordMismatchException()
    }
    return true;
  }
}
