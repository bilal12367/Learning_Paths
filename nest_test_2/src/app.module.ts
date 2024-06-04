import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { EncryptModule } from './encrypt/encrypt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mongodb",
      "host": "localhost",
      "port": 27017,
      "database": "test1",
      "entities": [__dirname + "/**/*.entity{.ts,.js}"],
      "synchronize": true
    }
    ),
    CustomerModule, EncryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
