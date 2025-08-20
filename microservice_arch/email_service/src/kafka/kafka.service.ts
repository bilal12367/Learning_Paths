import { Inject, Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from 'kafkajs';
import { TTopic, UserCreatedEvent } from './events';


@Injectable()
export class KafkaService implements OnModuleInit {
    private producer: Producer;
    
    constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

    async onModuleInit() {
        this.producer = await this.kafka.connect();
    }

    async sendUserLoggedEvent(topic: TTopic, message: UserCreatedEvent) {
        console.log("Seding Event: ", message)
        await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
        });
    }
    async sendUserCreatedEvent(topic: TTopic, message: UserCreatedEvent) {
        console.log("Seding Event: ", message)
        await this.producer.send({
        topic,
        
        messages: [{ value:  JSON.stringify(message) }],
        });
    }
}
