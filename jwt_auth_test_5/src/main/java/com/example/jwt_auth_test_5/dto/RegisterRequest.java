package com.example.jwt_auth_test_5.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    
    private String userName;
    private String email;
    private String password;
}
