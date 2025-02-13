import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOtp } from '../entities/user_otp.entity';
import { UsersModule } from 'src/api/users/users.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { ConfigModule } from 'src/config/config.module';
import { UserEmailVerification } from '../entities/user_email_verification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserOtp,UserEmailVerification]), UsersModule, JwtModule, ConfigModule],
    providers: [OtpService],
    exports: [OtpService],
})
export class OtpModule {}
