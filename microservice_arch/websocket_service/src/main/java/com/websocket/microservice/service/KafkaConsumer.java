package com.websocket.microservice.service;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.websocket.microservice.service.events.UserEvent;


record TestEvent(String article) {
}

@Component
public class KafkaConsumer {

    @Autowired
    private WebsocketService websocketService;

    public static <T> T getObject(String json, Class<T> T) {
        try{
            Gson gson = new Gson();
            return gson.fromJson(json, T);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @KafkaListener(topics = "user-logged-in", groupId = "websocketGroup")
    public void consume(String event) {
        UserEvent userEvent = this.getObject(event, UserEvent.class);
        System.out.println("Received: " + userEvent.toString());
        websocketService.sendUserLoggedEvent(userEvent);
    }
}