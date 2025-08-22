import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { KafkaConfig } from './kafka.config';

@Module({
  imports: [
    ClientsModule.register([
      KafkaConfig
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService], 
})
export class KafkaModule {}
