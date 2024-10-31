import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/entities/user.entity';
import MySqlConfig from './config/MySqlConfig';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(MySqlConfig),
  TypeOrmModule.forFeature([User]),
  UserModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
