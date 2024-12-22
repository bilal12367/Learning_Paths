import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './models/user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/user")
  saveUser(@Body() user: User): Promise<User> {
    return this.appService.saveuser(user);
  }
}
