import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/api/users/users.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOtp } from './entities/user_otp.entity';

@Module({
  imports: [UsersModule, JwtModule, TypeOrmModule.forFeature([UserOtp])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
