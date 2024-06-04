import { Controller, Post, Body } from '@nestjs/common';
import { Customer } from 'src/entity/customer.entity';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {

    constructor(
        private readonly customerService: CustomerService
    ) { }

    @Post("/register")
    async registerCustomer(@Body() body: any) {
        const { firstName, lastName, email, password } : any = body
        const regCustomer = await this.customerService.registerCustomer(firstName,lastName,email,password)
        return regCustomer;
    }
}
