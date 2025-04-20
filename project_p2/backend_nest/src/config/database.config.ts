import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOtp } from 'src/api/auth/entities/user_otp.entity';
import { User } from 'src/api/users/entities/user.entity';
import { TestLogger } from './logger.config';
import { UserEmailVerification } from 'src/api/auth/entities/user_email_verification.entity';
import { ConfigModule } from '@nestjs/config';
import { FileEntity } from 'src/api/file/entities/file.entity';
import { Server } from 'src/api/servers/entities/server.entity';
import { RoleEntity } from 'src/api/roles/entities/role.entity';
import { RoleAssignment } from 'src/api/roles/entities/role.assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User, Server, UserOtp, UserEmailVerification, FileEntity, RoleEntity, RoleAssignment],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule { }
