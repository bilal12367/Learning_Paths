import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common/interfaces';
import { ClientKafka } from '@nestjs/microservices';
import { Consumer, EachMessagePayload, Kafka, Producer } from 'kafkajs';
import { TTopic, UserCreatedEvent } from './events';
import { KafkaConfig } from './kafka.config';


@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    private readonly kafka: Kafka = new Kafka(KafkaConfig.options.client)

    private readonly producer: Producer = this.kafka.producer();
    private readonly consumer: Consumer = this.kafka.consumer({ groupId: 'email-group' });

    private readonly logger: Logger = new Logger(KafkaService.name);

    async onModuleInit() {
        await this.producer.connect();
        await this.consumer.connect();

        await this.consumer.subscribe({topics: ['user-created', 'user-logged-in'], fromBeginning: false})
        await this.consumer.run({
            eachMessage: async (message: EachMessagePayload) => {
                const { topic, partition, message: msg } = message;
                this.logger.log(`Received message: ${msg.value} on topic: ${topic}`);
            }
        })
    }
    async onModuleDestroy() {
        await this.producer.disconnect();
        await this.consumer.disconnect();
    }

    async sendEvent(topic: TTopic, event: any) {
        this.logger.log(`Sending event to topic ${topic}: ${JSON.stringify(event)}`);
        await this.producer.send({
            topic,
            messages: [
                { value: JSON.stringify(event) }
            ]
        });
    }
}
