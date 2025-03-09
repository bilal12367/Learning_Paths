import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { ExemptRoute } from 'src/exempt/exempt.decorator';
import { LoginUserDto } from './dto/login.dto';
import { AuthExceptionFilter } from 'src/exceptions/auth_exceptions/auth.exception.filter';
import { ForgetUserDto } from './auth.types';
import { TransactionInterceptor } from 'src/interceptors/transaction.interceptor';
import { ResponseBuilder } from 'src/common/builders/ResponseBuilder';
import { Response, Request } from 'express';
import { TokenNotFoundException } from 'src/exceptions/auth_exceptions/auth.exceptions';
import { UsersService } from '../users/users.service';
import { delay } from 'rxjs';
import { setTimeout } from 'timers/promises'; 
import { User } from '../users/entities/user.entity';

@Controller('api/auth')
@ExemptRoute()
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) { }

  @Post('register')
  @UseInterceptors(TransactionInterceptor)
  public async registerUser(@Body() registerUser: RegisterUserDto) {
    return await this.authService.registerUser(registerUser)
  }

  @Post('login')
  public async loginUser(@Body() loginUser: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const payload = await this.authService.loginUser(loginUser)
    res.cookie('token', payload.data.token)
    payload.token = undefined
    payload.message = "Logged In Successfully!!"
    return payload
  }

  @Get('verifyUser')
  public async verifyUser(@Req() req: Request) {
    console.log("Cookies: ", req.cookies)
    const user: User = await this.userService.verifyUser(req.cookies)
    user.password = undefined; user.dob = undefined; user.id = undefined;
    // await setTimeout(4000)
    return new ResponseBuilder().setStatus('success').setData(user).setMessage("User Verified").build()
  }


  @Post('forgetPassword')
  public async forgetPassword(@Body() forgetUserDto: ForgetUserDto) {
    await this.authService.forgetUser(forgetUserDto)
  }

  @Post('emailVerification')
  public async verifyEmail(@Body() verifyDTO: verifyDTO) {
    const message = await this.authService.emailVerification(verifyDTO.token)
    return new ResponseBuilder().setStatus('success').setData(message).setMessage(message).build()
  }
}
