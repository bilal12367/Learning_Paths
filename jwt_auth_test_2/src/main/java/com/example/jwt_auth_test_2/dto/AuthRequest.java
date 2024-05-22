package com.example.jwt_auth_test_2.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AuthRequest
 */
@NoArgsConstructor
@Data
public class AuthRequest {

    private String email;
    private String password;
}