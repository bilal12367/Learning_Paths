package com.example.jwt_auth_test_4.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    private String userName;
    private String password;
    private int age;
    private String email;
}
