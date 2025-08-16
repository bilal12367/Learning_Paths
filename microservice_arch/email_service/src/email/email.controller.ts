import { Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-email')
  async sendEmail() {
    return await this.emailService.sendEmail();
  }
}
