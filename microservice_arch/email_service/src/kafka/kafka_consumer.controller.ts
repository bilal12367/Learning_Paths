import { Body, Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";



@Controller()
export class KafkaConsumerController {

    // @MessagePattern('user-created')
    // async sendEmailUserCreated(@Payload() userRegisteredData: any ) {
    //     console.log('User Created Event Received:', userRegisteredData);
    //     // Here you would typically call a service to send the email
    //     // For example: await this.emailService.sendWelcomeEmail(userRegisteredData);
    // }
}