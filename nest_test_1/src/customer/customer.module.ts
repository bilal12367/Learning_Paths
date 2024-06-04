import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../config/dbConfig.json'
import { Repository } from 'typeorm';
import { Customer } from 'src/entity/user.entity';
import { EncryptService } from 'src/utils/encrypt/encrypt.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mongodb",
      "host": "localhost",
      "port": 27017,
      "database": "test1",
      "entities": [__dirname + "../entity/*.entity.ts"],
      "synchronize": true
    }
    ),
    TypeOrmModule.forFeature([Customer])
  ],
  controllers: [CustomerController],
  providers: [CustomerService, EncryptService],

})
export class CustomerModule { }
