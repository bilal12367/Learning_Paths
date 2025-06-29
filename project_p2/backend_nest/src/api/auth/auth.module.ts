import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/api/users/users.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOtp } from './entities/user_otp.entity';
import { TestLogger } from 'src/config/logger.config';
import { DatabaseModule } from 'src/config/database.config';
import { ConfigModule } from 'src/config/config.module';
import { OtpService } from './otp/otp.service';
import { OtpModule } from './otp/otp.module';
import { TransactionInterceptor } from 'src/interceptors/transaction.interceptor';
import { UserEmailVerification } from './entities/user_email_verification.entity';

@Module({
  imports: [UsersModule, JwtModule, ConfigModule, TypeOrmModule.forFeature([UserOtp, UserEmailVerification]), OtpModule],
  controllers: [AuthController],
  providers: [AuthService, OtpService],
})
export class AuthModule { }
