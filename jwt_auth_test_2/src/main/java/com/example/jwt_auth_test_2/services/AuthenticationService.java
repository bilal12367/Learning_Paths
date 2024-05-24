package com.example.jwt_auth_test_2.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.jwt_auth_test_2.dto.AuthenticationRequest;
import com.example.jwt_auth_test_2.dto.AuthenticationResponse;
import com.example.jwt_auth_test_2.dto.RegisterRequest;
import com.example.jwt_auth_test_2.models.Role;
import com.example.jwt_auth_test_2.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) {
        System.out.println("Register Endpoint");
        var user = User.builder()
        .username(request.getFirstName())
        .password(passwordEncoder.encode(request.getPassword()))
        .build();
        
        return null;
    }
    public AuthenticationResponse login(AuthenticationRequest request) {
        return null;
    }
}
