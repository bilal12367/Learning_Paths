import { Injectable } from '@nestjs/common';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { MongoRepository } from 'typeorm';

@Injectable()
export class CustomerService {

    constructor(
        private readonly customerRepository: MongoRepository<>,
        private readonly encrypt: EncryptService
    ) { }
}
