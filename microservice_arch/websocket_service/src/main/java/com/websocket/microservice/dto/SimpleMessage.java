package com.websocket.microservice.dto;

public class SimpleMessage {
    private String message;
    // Add Getters and Setters
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    // ToSTring
    @Override
    public String toString() {
        return "SimpleMessage{" +
                "message='" + message + '\'' +
                '}';
    }
}
