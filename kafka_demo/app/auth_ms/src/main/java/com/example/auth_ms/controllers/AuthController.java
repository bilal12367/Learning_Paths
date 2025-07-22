package com.example.auth_ms.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.auth_ms.dto.RegisterDTO;
import com.example.auth_ms.models.UserEntity;
import com.example.auth_ms.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired()
    private UserService userService;

    @PostMapping("/register")
    public UserEntity registerUser(@RequestBody RegisterDTO registerDTO) {
        return userService.registerUser(registerDTO);
    }

    @PostMapping("/")
    public String test() {
        System.out.println("Test endpoint hit");
        return "Auth service is running";
    }
    
    
}
