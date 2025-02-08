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

@Module({
  imports: [UsersModule, JwtModule, ConfigModule, TypeOrmModule.forFeature([UserOtp])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
