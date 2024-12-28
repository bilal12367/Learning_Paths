import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  public async registerUser(@Body() registerUser: RegisterUserDto) {
    return await this.authService.registerUser(CreateUserDto
        .build()
        .setFirstName(registerUser.firstName)
        .setLastName(registerUser.lastName)
        .setIsActive(true)
      )
  }

}
