import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common/interfaces';
import { ClientKafka } from '@nestjs/microservices';
import { Consumer, EachMessagePayload, Kafka, KafkaMessage, Producer } from 'kafkajs';
import { TTopic, UserCreatedEvent } from './events';
import { KafkaConfig } from './kafka.config';
import { EmailService } from '../email/email.service';


@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    private readonly kafka: Kafka = new Kafka(KafkaConfig.options.client)

    private readonly producer: Producer = this.kafka.producer();
    private readonly consumer: Consumer = this.kafka.consumer({ groupId: 'email-group' });

    private readonly logger: Logger = new Logger(KafkaService.name);

    constructor(private readonly emailService: EmailService) {}

    async onModuleInit() {
        try {
            await this.producer.connect();
            await this.consumer.connect();
            
            await this.consumer.subscribe({topics: ['user.created','user.loggedIn'], fromBeginning: false})
            await this.consumer.run({

                eachMessage: async (message: EachMessagePayload) => {
                    var topic = message.topic as TTopic;
                    var msg = message.message.value?.toString() as any;
                    msg = JSON.parse(msg)
                    this.logger.log(`Received message: ${JSON.stringify(msg)} on topic: ${topic}`);
                    switch(topic as TTopic) {
                        case 'user.created':
                            this.emailService.sendEmail(msg.email, msg.token )
                            break
                        default: this.logger.error(`Topic ${topic} not implemented!! Email Service`)
                            break
                    }
                }
            })
        } catch (error) {
            this.logger.error("Failed to connect to kafka: Email Service")
        }
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
