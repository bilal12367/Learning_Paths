package com.websocket.microservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.websocket.microservice.dto.SimpleMessage;

@Controller
public class WebsocketHandler {
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/userCreated")
    public void userCreated(@Payload String message) {
        // This method can be used to handle user creation events
        System.out.println("User created event received: " + message);
        this.messagingTemplate.convertAndSend("/topic/userCreated", "A new user has been created.");
    }

    @PostMapping("/send-message/userCreated") 
    public ResponseEntity sendUserCreatedMessage(@RequestBody SimpleMessage message) {
        // This method can be used to send a message to the userCreated topic
        try {
            if (message == null || message.getMessage() == null || message.getMessage().isEmpty()) {
                System.out.println("Invalid message received");
                return ResponseEntity.badRequest().body("Invalid message");
            }
            
            this.messagingTemplate.convertAndSend("/topic/userCreated", message);
            return ResponseEntity.ok("Message sent to /topic/userCreated: " + message.getMessage());
        } catch (Exception e) {
            System.out.println("Error processing message: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error processing message: " + e.getMessage());
        }
    }
    

}
