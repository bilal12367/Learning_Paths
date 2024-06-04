import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../config/dbConfig.json'
import { Repository } from 'typeorm';
import { Customer } from 'src/entity/customer.entity';
import { EncryptService } from 'src/utils/encrypt/encrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer])
  ],
  controllers: [CustomerController],
  providers: [CustomerService, EncryptService],

})
export class CustomerModule { }
