import { ClientProviderOptions, Transport } from "@nestjs/microservices";


export const KafkaConfig: any = {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth-app',
        brokers: ['localhost:9092'], // your Kafka broker
      },
      consumer: {
        groupId: 'auth-group', // same groupId = load balancing
      },
    },
  }