package com.websocket.microservice.service.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data()
@ToString()
public class UserEvent {
    private String userId;
    private String username;
    private String time;
    
    public UserEvent() {}

    public UserEvent(String userId, String username, String time) {
        this.userId = userId;
        this.username = username;
        this.time = time;
    }

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }
}
