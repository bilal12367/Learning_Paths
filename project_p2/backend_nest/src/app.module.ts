import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from './jwt/jwt.service';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User]), AuthModule, UsersModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
