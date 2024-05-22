package com.example.jwt_auth_test_2.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTAuthenticationService {
    
    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String email) {
        return Jwts
                .builder()
                .claims(claims)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 30) )
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode("b622ad37d72954a6c3f68d4a6e77e5c487ed1b126a0d3051e149cf62cc352919fd09174f7d55e292ed238e7f0d1f83c5");
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
