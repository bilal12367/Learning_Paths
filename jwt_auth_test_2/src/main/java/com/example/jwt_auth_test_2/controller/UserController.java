package com.example.jwt_auth_test_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt_auth_test_2.dto.AuthRequest;
import com.example.jwt_auth_test_2.services.JWTAuthenticationService;

@RestController
public class UserController {

    @Autowired
    private JWTAuthenticationService jwtAuthenticationService;

    @PostMapping("/login")
    public String loginAndGetToken(@RequestBody AuthRequest authRequest) {
        return jwtAuthenticationService.generateToken(authRequest.getEmail());
    }
}