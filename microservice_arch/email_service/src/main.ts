import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';
import { KafkaConfig } from './kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.connectMicroservice<MicroserviceOptions>(KafkaConfig as MicroserviceOptions);

  // await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 4500);
}
bootstrap();
