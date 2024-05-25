package com.example.jwt_auth_test_5.service;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.jwt_auth_test_5.config.JwtService;
import com.example.jwt_auth_test_5.dto.AuthenticationResponse;
import com.example.jwt_auth_test_5.dto.LoginRequest;
import com.example.jwt_auth_test_5.dto.RegisterRequest;
import com.example.jwt_auth_test_5.dto.Role;
import com.example.jwt_auth_test_5.entity.User;
import com.example.jwt_auth_test_5.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        var user = User.builder()
                .userName(registerRequest.getUserName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .username(user.getUsername())
                .build();
    }

    public AuthenticationResponse login(LoginRequest loginRequest) throws Exception {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new Exception("Email Not Found Exception!!"));
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .username(user.getUsername())
                .token(jwtToken)
                .build();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
