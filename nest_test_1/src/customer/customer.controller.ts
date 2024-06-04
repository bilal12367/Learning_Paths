import { Controller, Post, Req, Res } from '@nestjs/common';
import { Customer } from 'src/entity/user.entity';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {

    constructor(
        private readonly customerService: CustomerService
    ) { }

    @Post("/register")
    async registerCustomer(@Req() req: Request, @Res() res: Response): Promise<Customer> {
        const { firstName, lastName, email, password } : any = req.body
        const regCustomer = await this.customerService.registerCustomer(firstName,lastName,email,password)
        return regCustomer;
    }
}
