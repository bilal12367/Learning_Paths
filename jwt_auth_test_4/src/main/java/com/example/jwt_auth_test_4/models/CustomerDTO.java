package com.example.jwt_auth_test_4.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class CustomerDTO {
    
    private String name;
    private String email;
    private String password;
}
