import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { KafkaModule } from 'src/kafka/kafka.module';
import { UserVerification } from './entities/user_verification.entity';
import { RbacModule } from './rbac/rbac.module';


@Module({
  imports: [TypeOrmModule.forFeature([User, UserVerification]),
    JwtModule.register({
      secret: 'your_secret_key', // 🔐 Use env variable in production
      signOptions: { expiresIn: '1h' }, // token expiry
    }),
    KafkaModule,
    RbacModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
