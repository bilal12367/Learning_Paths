import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerController } from './kafka_consumer.controller';
import { KafkaConfig } from './kafka.config';

@Module({
  imports: [
    ClientsModule.register([
      KafkaConfig,
    ]),
  ],
  controllers: [KafkaConsumerController],
  providers: [KafkaService],
  exports: [KafkaService], 
})
export class KafkaModule {}
