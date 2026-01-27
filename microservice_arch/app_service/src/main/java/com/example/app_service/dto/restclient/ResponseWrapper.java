package com.example.app_service.dto.restclient;


import java.util.List;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ResponseWrapper<T> {
    private String type;
    private T data;
    
    public Object getData() {
        if (this.type.equalsIgnoreCase("list")) {
            return (List<T>) this.data;
        } else {
            return (T) this.data;
        }
    }
}
