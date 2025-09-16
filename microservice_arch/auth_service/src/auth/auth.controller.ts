import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from 'src/kafka/kafka.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userForm: UserForm) {
    const { email, password, username } = userForm;
    return this.authService.registerUser({ email, password, username });
  }

  @Post('login')
  loginUser(@Body() userForm: { email: string; password: string }) {
    const { email, password } = userForm;
    return this.authService.loginUser({ email, password });
  }

  @Get('verify')
  async verifyToken(@Query('token') token: string) {
    if(!token) {
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    }
    return await this.authService.userVerification(token);
  }

  @Post('verify-status')
  async getUserVerificationDetails(@Body() body: {userId: string} ){
    if(!body.userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    return await this.authService.getUserVerificationData(body.userId);
  }

  
  // @MessagePattern('user_logged_in')
  // handleUserCreated(@Payload() data: any) {
  //   console.log('User Logged event received:', data);
  //   // Handle the user created event, e.g., log it or perform additional actions
  // }
}
