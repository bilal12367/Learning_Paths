package com.example.jwt_auth_test_3.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    private String email;
    private String password;
    private String userName;
}
