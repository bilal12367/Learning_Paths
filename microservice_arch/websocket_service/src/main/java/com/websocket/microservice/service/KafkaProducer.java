package com.websocket.microservice.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.websocket.microservice.service.events.UserEvent;

@Service
public class KafkaProducer {
    

    private final KafkaTemplate<String, UserEvent> kafkaTemplate;

    public KafkaProducer(KafkaTemplate<String, UserEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendUserCreatedEvent(UserEvent event) {
        kafkaTemplate.send("user-created-topic", event.getUserId(), event);
    }
}
