import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { ExemptRoute } from 'src/exempt/exempt.decorator';
import { LoginUserDto } from './dto/login.dto';
import { AuthExceptionFilter } from 'src/exceptions/auth_exceptions/auth.exception.filter';

@Controller('auth')
@ExemptRoute()
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('register')
  public async registerUser(@Body() registerUser: RegisterUserDto) {
    return await this.authService.registerUser(registerUser)
  }
  
  @Post('login')
  public async loginUser(@Body() loginUser: LoginUserDto) {
    return await this.authService.loginUser(loginUser)
  }

}
