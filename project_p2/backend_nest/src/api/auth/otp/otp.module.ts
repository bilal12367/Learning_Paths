import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOtp } from '../entities/user_otp.entity';
import { UsersModule } from 'src/api/users/users.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserOtp]), UsersModule, JwtModule],
    providers: [OtpService],
    exports: [OtpService],
})
export class OtpModule {}
