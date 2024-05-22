package com.example.jwt_auth_test_3.services;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.jwt_auth_test_3.dto.RegisterRequest;
import com.example.jwt_auth_test_3.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;

@Service
public class AuthService {
    
    @Autowired
    private JwtService jwtService;

    public String registerUser(RegisterRequest request) {
        User user = new User(request.getUserName(),request.getEmail(),request.getPassword(), 'M');
        String token = Jwts.builder().claims(new HashMap<>()).subject(user.getUserName()).issuedAt(new Date(System.currentTimeMillis())).expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24)).signWith(jwtService.getSignInKey(), SIG.HS256).compact();
        return token;
    }
}
