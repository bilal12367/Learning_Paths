import { Inject, Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
    private producer: Producer;
    
    constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

    async onModuleInit() {
        this.producer = await this.kafka.connect();
    }

    async sendMessage(topic: string, message: any) {
        await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
        });
    }
}
