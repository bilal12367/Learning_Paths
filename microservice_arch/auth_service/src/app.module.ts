import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';
import { UserVerification } from './auth/entities/user_verification.entity';
import { ConfigModule } from '@nestjs/config';
import { Permission } from './auth/rbac/entities/Permission';
import { RolePermission } from './auth/rbac/entities/RolePermission';
import { UserRole } from './auth/rbac/entities/UserRole';
import { Role } from './auth/rbac/entities/Role';
import { RoleAssociation } from './auth/rbac/entities/RoleAssociation';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'auth',
      entities: [User, UserVerification, Permission, RolePermission, UserRole, Role, RoleAssociation],
      synchronize: true, // For dev only, auto-create tables
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available app-wide
      envFilePath: '.env', // Optional, defaults to '.env'
    }),
    AuthModule,
    KafkaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
