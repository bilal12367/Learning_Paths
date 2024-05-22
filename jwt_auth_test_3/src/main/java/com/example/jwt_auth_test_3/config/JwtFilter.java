package com.example.jwt_auth_test_3.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.jwt_auth_test_3.services.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String uri = request.getRequestURI();
        if (uri.startsWith("/api/")) {
            System.out.println("JWT Filter Intercepted the request");
            final String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String jwt = authorizationHeader.substring(7);
                System.out.println("Token Found !! Token = " + jwt);
                Claims claims = Jwts.parser().verifyWith(jwtService.getSignInKey()).build().parseSignedClaims(jwt).getPayload();
                System.out.println("Extracted Value: "+claims.getSubject());
                Authentication auth = new UsernamePasswordAuthenticationToken(claims.getSubject(), null);
                SecurityContextHolder.getContext().setAuthentication(auth);
                filterChain.doFilter(request, response);
            } else {
                System.out.println("No Token Found");
            }

        } else {
            System.out.println("Bypass Jwt Filter");
            filterChain.doFilter(request, response);
        }

    }

}
