import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOtp } from 'src/api/auth/entities/user_otp.entity';
import { User } from 'src/api/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.0.6',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User, UserOtp],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
