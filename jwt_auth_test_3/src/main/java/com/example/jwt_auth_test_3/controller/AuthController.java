package com.example.jwt_auth_test_3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt_auth_test_3.dto.RegisterRequest;
import com.example.jwt_auth_test_3.entity.User;
import com.example.jwt_auth_test_3.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest request) {
        System.out.println("Register Api hit");
        return authService.registerUser(request);
    }
}
