import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {

    constructor(
        private readonly customerService: CustomerService
    ) {}

    @Post() 
    async registerCustomer(@Body() body: any) {
        
    }
}
