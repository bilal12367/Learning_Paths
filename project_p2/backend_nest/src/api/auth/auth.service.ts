import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { ForgetUserDto, IUserToken } from './auth.types';
import { LoginUserDto } from './dto/login.dto';
import { genSalt, hash, compare } from 'bcryptjs'
import { PasswordMismatchException, UserAlreadyExistsException, UserNotFoundException } from 'src/exceptions/auth_exceptions/auth.exceptions';
import { RegisterUserDto } from './dto/register.dto';
import nodemailer, { SentMessageInfo } from 'nodemailer'
import fs from 'fs'
import { Repository } from 'typeorm';
import { UserOtp } from './entities/user_otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TestLogger } from 'src/config/logger.config';
import { OtpService } from './otp/otp.service';
import { UserEmailVerification } from './entities/user_email_verification.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserOtp) private readonly userOtpRepository: Repository<UserOtp>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: TestLogger,
    private readonly otpService: OtpService
  ) { }

  async registerUser(createUserDto: RegisterUserDto): Promise<any> {
    this.logger.log(createUserDto)
    if (await this.userService.exists(createUserDto.email)) {
      throw new UserAlreadyExistsException()
    }
    createUserDto.password = await this.hashPassword(createUserDto.password)
    const regUser = await this.userService.create(createUserDto);
    // const token = this.jwtService.generateToken({ id: regUser.id.toString() })
    const emailTransportInfo = await this.otpService.sendVerificationEmail(createUserDto.email)
    return { email: regUser.email, emailTransportInfo: emailTransportInfo }
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

  async forgetUser(forgetUserDto: ForgetUserDto) {
    return await this.otpService.sendForgetPasswordOtp(forgetUserDto.email)
  }

  async emailVerification(token: string) {
    return await this.otpService.emailVerification(token)
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
