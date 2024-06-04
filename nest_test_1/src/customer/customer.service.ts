import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entity/user.entity';
import { EncryptService } from 'src/utils/encrypt/encrypt.service';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
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
