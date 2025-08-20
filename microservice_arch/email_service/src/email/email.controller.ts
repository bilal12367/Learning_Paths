import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-email')
  async sendEmail(@Body() body: { email: string, token: string}): Promise<any> {
    return await this.emailService.sendEmail(body.email, body.token);
  }
}
