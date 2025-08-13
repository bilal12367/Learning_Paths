import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Post('verify')
  verifyToken(@Body() body: { token: string }) {
    return this.authService.verifyToken(body.token);
  }

  @MessagePattern('user_logged_in')
  handleUserCreated(@Payload() data: any) {
    console.log('User Logged event received:', data);
    // Handle the user created event, e.g., log it or perform additional actions
  }
}
