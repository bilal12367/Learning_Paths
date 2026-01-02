import { ClientProviderOptions, Transport } from "@nestjs/microservices";


export const KafkaConfig: any = {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'email-app',
        brokers: ['localhost:9092'], // your Kafka broker
      },
      consumer: {
        groupId: 'email-group', // same groupId = load balancing
      },
    },
  }