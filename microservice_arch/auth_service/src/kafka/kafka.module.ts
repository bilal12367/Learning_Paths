import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-app',
            brokers: ['localhost:9092'], // your Kafka broker
          },
          consumer: {
            groupId: 'auth-group', // same groupId = load balancing
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService], 
})
export class KafkaModule {}
