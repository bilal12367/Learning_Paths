package com.websocket.microservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.websocket.microservice.service.events.UserEvent;

@Service
public class WebsocketService {
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    public void sendUserLoggedEvent(UserEvent event) {
        try {
            this.messagingTemplate.convertAndSend("/topic/userLoggedIn", event);            
        } catch (Exception e) {
            System.out.println("Error sending user logged event: " + e.getMessage());
        }
    }
}
