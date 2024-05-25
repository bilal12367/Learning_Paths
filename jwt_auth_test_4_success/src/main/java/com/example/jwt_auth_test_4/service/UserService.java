package com.example.jwt_auth_test_4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.jwt_auth_test_4.dto.JwtRequest;
import com.example.jwt_auth_test_4.dto.JwtResponse;
import com.example.jwt_auth_test_4.dto.RegisterRequest;
import com.example.jwt_auth_test_4.jwt.JwtHelper;
import com.example.jwt_auth_test_4.models.User;
import com.example.jwt_auth_test_4.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtHelper helper;

    public String registerUser(RegisterRequest req) {
        
        User regUser = userRepository.save(new User(req.getUserName(),req.getPassword(), req.getAge(), req.getEmail(), "ROLE"));
        UserDetails userDetails = userDetailsService.loadUserByUsername(regUser.getUsername());
        return helper.generateToken(userDetails);

    }
}
