import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './api/users/entities/user.entity';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { JwtService } from './jwt/jwt.service';
import { JwtModule } from './jwt/jwt.module';
import { ServersModule } from './api/servers/servers.module';
import { FileModule } from './api/file/file.module';
import { RolesModule } from './api/roles/roles.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User]), AuthModule, UsersModule, JwtModule, ServersModule, FileModule, RolesModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
