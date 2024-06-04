import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer.entity';
import { EncryptService } from 'src/utils/encrypt/encrypt.service';
import { MongoRepository } from 'typeorm';

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: MongoRepository<Customer>,
        private readonly encrypt: EncryptService
    ) {}

    async registerCustomer (firstName, lastName, email, password) : Promise<Customer> {
        const hashedPassword : string = await this.encrypt.encryptPassword(password)  as string
        const registeredCustomer: Customer = await this.customerRepository.save({
            firstName, 
            lastName,
            email,
            password: hashedPassword
        })
        return registeredCustomer;
    }

}
