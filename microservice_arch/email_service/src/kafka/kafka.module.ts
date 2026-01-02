import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerController } from './kafka_consumer.controller';
import { KafkaConfig } from './kafka.config';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    EmailModule
  ],
  controllers: [KafkaConsumerController],
  providers: [KafkaService],
  exports: [KafkaService], 
})
export class KafkaModule {}
